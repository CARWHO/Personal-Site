import tkinter as tk
from tkinter import ttk, scrolledtext, filedialog
import json
import threading
import time
import os

# Global data structures
test_sequence = []
node_list = []  # e.g. [{"name": "Node1", "scid": 5, "com": "COM3"}, ...]

##############################################################################
# Main GUI
##############################################################################
class TestSuiteGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("SIDELOADING Test Suite Builder for life cycle testing")
        self.geometry("1200x600")

        # Map from TreeView item ID -> the actual dict item in test_sequence
        self.tree_item_map = {}

        # For auto-naming nodes if left blank
        self.node_name_counter = 1

        # Dummy variable (no backend functionality)
        self.dummy_interface = None

        # Dummy variable to mimic a process (not used)
        self.tlm_src_process = None

        # Layout: left side = TreeView, right side = node manager + action buttons
        container = ttk.Frame(self)
        container.pack(fill="both", expand=True, padx=10, pady=10)

        self.tree_frame = ttk.Frame(container)
        self.tree_frame.pack(side="left", fill="both", expand=True)

        self.right_frame = ttk.Frame(container)
        self.right_frame.pack(side="right", fill="y", padx=5)

        # Build UI components
        self._build_treeview()
        self._build_node_manager()
        self._build_actions()

        # Logging
        self.log_box = scrolledtext.ScrolledText(self, height=10)
        self.log_box.pack(fill="x", padx=10, pady=5)

    # ------------------------------------------------------------------------
    # 1. TreeView
    # ------------------------------------------------------------------------
    def _build_treeview(self):
        columns = ("Description",)
        self.tree = ttk.Treeview(self.tree_frame, columns=columns, show="tree", selectmode="extended")
        self.tree.heading("#0", text="Step")
        self.tree.heading("Description", text="Description")
        self.tree.pack(fill="both", expand=True)

    # ------------------------------------------------------------------------
    # 2. Node Manager
    # ------------------------------------------------------------------------
    def _build_node_manager(self):
        self.node_manager_frame = ttk.LabelFrame(self.right_frame, text="Node Manager")
        self.node_manager_frame.pack(fill="x", pady=5)

        # Node buttons frame
        btn_frame = ttk.Frame(self.node_manager_frame)
        btn_frame.pack(fill="x", padx=5, pady=5)
        
        add_node_btn = ttk.Button(btn_frame, text="➕ Add Node", command=self.add_node_dialog)
        add_node_btn.pack(side="left", expand=True, fill="x", padx=2)
        
        delete_node_btn = ttk.Button(btn_frame, text="❌ Delete Node", command=self.delete_selected_node)
        delete_node_btn.pack(side="left", expand=True, fill="x", padx=2)

        # Node list with a descriptive label
        ttk.Label(self.node_manager_frame, text="Configured Nodes:").pack(anchor="w", padx=5)
        
        # Create a frame for the listbox with a border
        list_frame = ttk.Frame(self.node_manager_frame, relief="solid", borderwidth=1)
        list_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        self.node_listbox = tk.Listbox(list_frame, height=6, borderwidth=0, highlightthickness=0)
        self.node_listbox.pack(fill="both", expand=True)

    def add_node_dialog(self):
        dialog = tk.Toplevel(self)
        dialog.title("Add Node")

        ttk.Label(dialog, text="Name:").grid(row=0, column=0, padx=5, pady=5)
        name_var = tk.StringVar(value="")
        ttk.Entry(dialog, textvariable=name_var).grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(dialog, text="SCID:").grid(row=1, column=0, padx=5, pady=5)
        scid_var = tk.StringVar(value="5")
        ttk.Entry(dialog, textvariable=scid_var).grid(row=1, column=1, padx=5, pady=5)

        ttk.Label(dialog, text="COM Port:").grid(row=2, column=0, padx=5, pady=5)
        com_var = tk.StringVar(value="COM3")
        ttk.Entry(dialog, textvariable=com_var).grid(row=2, column=1, padx=5, pady=5)

        def on_ok():
            try:
                scid_int = int(scid_var.get())
                com_str = com_var.get().strip()
                user_name = name_var.get().strip()

                if not com_str:
                    raise ValueError("COM Port cannot be empty.")

                if not user_name:
                    user_name = f"Node{self.node_name_counter}"
                    self.node_name_counter += 1

                new_node = {
                    "name": user_name,
                    "scid": scid_int,
                    "com": com_str
                }
                node_list.append(new_node)
                self.refresh_node_listbox()
                dialog.destroy()

            except ValueError as e:
                self.log(f"Error adding node: {e}")

        ttk.Button(dialog, text="OK", command=on_ok).grid(row=3, column=0, columnspan=2, pady=10)

    def delete_selected_node(self):
        sel = self.node_listbox.curselection()
        if not sel:
            self.log("No node selected to delete.")
            return

        idx = sel[0]
        node_to_delete = node_list[idx]
        node_list.remove(node_to_delete)
        self.refresh_node_listbox()
        self.log(f"Deleted node: {node_to_delete['name']}")

    def refresh_node_listbox(self):
        self.node_listbox.delete(0, tk.END)
        for node in node_list:
            disp = f"{node['name']} (SCID={node['scid']}, {node['com']})"
            self.node_listbox.insert(tk.END, disp)

    # ------------------------------------------------------------------------
    # 3. Action Buttons
    # ------------------------------------------------------------------------
    def _build_actions(self):
        action_frame = ttk.LabelFrame(self.right_frame, text="Test Actions")
        action_frame.pack(fill="x", pady=5)

        # Add Items Section
        add_frame = ttk.LabelFrame(action_frame, text="Add Items")
        add_frame.pack(fill="x", padx=5, pady=5)
        
        ttk.Button(add_frame, text="➕ Add Command", command=self.add_command_dialog).pack(pady=2, fill="x")
        ttk.Button(add_frame, text="⏱️ Add Delay", command=self.add_delay_dialog).pack(pady=2, fill="x")
        ttk.Button(add_frame, text="🔄 Add Loop", command=self.add_loop_dialog).pack(pady=2, fill="x")

        # Edit Section
        edit_frame = ttk.LabelFrame(action_frame, text="Edit Selection")
        edit_frame.pack(fill="x", padx=5, pady=5)
        
        move_frame = ttk.Frame(edit_frame)
        move_frame.pack(fill="x", pady=2)
        ttk.Button(move_frame, text="⬆️ Move Up", command=self.move_selected_up).pack(side="left", expand=True, fill="x", padx=2)
        ttk.Button(move_frame, text="⬇️ Move Down", command=self.move_selected_down).pack(side="left", expand=True, fill="x", padx=2)
        
        ttk.Button(edit_frame, text="🔄 Wrap in Loop", command=self.wrap_in_loop).pack(pady=2, fill="x")
        ttk.Button(edit_frame, text="❌ Delete Selected", command=self.delete_selected_item).pack(pady=2, fill="x")

        # File Operations Section
        file_frame = ttk.LabelFrame(action_frame, text="File Operations")
        file_frame.pack(fill="x", padx=5, pady=5)
        
        ttk.Button(file_frame, text="💾 Save Sequence", command=self.save_sequence).pack(pady=2, fill="x")
        ttk.Button(file_frame, text="📂 Load Sequence", command=self.load_sequence).pack(pady=2, fill="x")

        # Run Section
        run_frame = ttk.LabelFrame(action_frame, text="Execute")
        run_frame.pack(fill="x", padx=5, pady=5)
        
        run_btn = ttk.Button(run_frame, text="▶️ Run Test Suite", command=self.run_suite_threaded)
        run_btn.pack(pady=5, fill="x")
        style = ttk.Style()
        style.configure("Run.TButton", foreground="green")
        run_btn.configure(style="Run.TButton")

    # ------------------------------------------------------------------------
    # 4. Logging
    # ------------------------------------------------------------------------
    def log(self, msg):
        self.log_box.insert(tk.END, msg + "\n")
        self.log_box.see(tk.END)
        print(msg)

    # ------------------------------------------------------------------------
    # 5. Add Command / Delay / Loop
    # ------------------------------------------------------------------------
    def add_command_dialog(self):
        dialog = tk.Toplevel(self)
        dialog.title("Add Command")

        ttk.Label(dialog, text="Command:").grid(row=0, column=0, padx=5, pady=5)
        cmd_var = tk.StringVar(value="idle")
        # List of dummy commands
        commands = ["idle", "prepare", "arm", "fire", "enable_can", "disable_can", "switch_can", "run_tlm_src", "stop_tlm_src"]
        cmd_combo = ttk.Combobox(dialog, textvariable=cmd_var, values=commands, state="readonly")
        cmd_combo.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(dialog, text="Select Nodes (if applicable):").grid(row=1, column=0, padx=5, pady=5)
        node_select_listbox = tk.Listbox(dialog, selectmode="extended", height=6)
        node_select_listbox.grid(row=1, column=1, padx=5, pady=5)

        for i, node in enumerate(node_list):
            display = f"{node['name']} (SCID={node['scid']}, {node['com']})"
            node_select_listbox.insert(tk.END, display)

        def on_ok():
            sel_indices = node_select_listbox.curselection()
            selected_command = cmd_var.get()

            # Dummy validations
            if selected_command == "switch_can" and len(sel_indices) != 2:
                self.log("Switch CAN command requires exactly two nodes. Please select two nodes.")
                return
            if selected_command == "run_tlm_src" and len(sel_indices) != 1:
                self.log("run_tlm_src command requires exactly one node. Please select one node.")
                return
            if selected_command == "stop_tlm_src" and len(sel_indices) != 0:
                self.log("stop_tlm_src command does not require node selection. Please do not select any nodes.")
                return

            selected_nodes = [node_list[i] for i in sel_indices] if sel_indices else []
            cmd_item = {
                "type": "command",
                "command": selected_command,
                "nodes": selected_nodes
            }
            test_sequence.append(cmd_item)
            self.add_item_to_tree(cmd_item)
            dialog.destroy()

        ttk.Button(dialog, text="OK", command=on_ok).grid(row=2, column=0, columnspan=2, pady=10)

    def add_delay_dialog(self):
        dialog = tk.Toplevel(self)
        dialog.title("Add Delay")

        ttk.Label(dialog, text="Delay (seconds):").grid(row=0, column=0, padx=5, pady=5)
        delay_var = tk.StringVar(value="5")
        ttk.Entry(dialog, textvariable=delay_var, width=10).grid(row=0, column=1, padx=5, pady=5)

        def on_ok():
            try:
                secs = int(delay_var.get())
                delay_item = {"type": "delay", "seconds": secs}
                test_sequence.append(delay_item)
                self.add_item_to_tree(delay_item)
                dialog.destroy()
            except ValueError:
                self.log("Delay must be an integer!")

        ttk.Button(dialog, text="OK", command=on_ok).grid(row=1, column=0, columnspan=2, pady=10)

    def add_loop_dialog(self):
        dialog = tk.Toplevel(self)
        dialog.title("Add Loop")

        ttk.Label(dialog, text="Repeat count:").grid(row=0, column=0, padx=5, pady=5)
        count_var = tk.StringVar(value="3")
        ttk.Entry(dialog, textvariable=count_var, width=10).grid(row=0, column=1, padx=5, pady=5)

        def on_ok():
            try:
                count = int(count_var.get())
                loop_item = {"type": "loop", "count": count, "tasks": []}
                test_sequence.append(loop_item)
                self.add_item_to_tree(loop_item)
                dialog.destroy()
            except ValueError:
                self.log("Repeat count must be an integer!")

        ttk.Button(dialog, text="OK", command=on_ok).grid(row=1, column=0, columnspan=2, pady=10)

    # ------------------------------------------------------------------------
    # 6. Tree Management
    # ------------------------------------------------------------------------
    def add_item_to_tree(self, item, parent=""):
        if item["type"] == "command":
            node_names = [n["name"] for n in item["nodes"]]
            node_str = ", ".join(node_names)
            label = f"{item['command']} -> [{node_str}]" if node_names else f"{item['command']}"
            tree_id = self.tree.insert(parent, tk.END, text="Command", values=(label,))
        elif item["type"] == "delay":
            label = f"Delay {item['seconds']}s"
            tree_id = self.tree.insert(parent, tk.END, text="Delay", values=(label,))
        elif item["type"] == "loop":
            label = f"Loop x{item['count']}"
            tree_id = self.tree.insert(parent, tk.END, text="Loop", values=(label,))
        else:
            return

        self.tree_item_map[tree_id] = item

    def rebuild_tree(self):
        self.tree.delete(*self.tree.get_children())
        self.tree_item_map.clear()
        for item in test_sequence:
            self.add_item_to_tree(item)

    def delete_selected_item(self):
        selected_ids = self.tree.selection()
        if not selected_ids:
            self.log("No item selected to delete.")
            return

        items_to_remove = [self.tree_item_map[sid] for sid in selected_ids if sid in self.tree_item_map]

        for sid in selected_ids:
            if sid in self.tree_item_map:
                del self.tree_item_map[sid]
            self.tree.delete(sid)

        for i in items_to_remove:
            if i in test_sequence:
                test_sequence.remove(i)

        self.log("Deleted selected item(s).")

    def move_selected_up(self):
        selected_ids = self.tree.selection()
        if len(selected_ids) != 1:
            self.log("Please select exactly one item to move up.")
            return

        sid = selected_ids[0]
        item = self.tree_item_map.get(sid)
        if not item:
            self.log("Selected item not found in map.")
            return

        idx = next(i for i, obj in enumerate(test_sequence) if obj is item)
        if idx == 0:
            self.log("Item is already at the top.")
            return

        test_sequence[idx], test_sequence[idx - 1] = test_sequence[idx - 1], test_sequence[idx]
        self.rebuild_tree()
        self.log("Moved item up.")

    def move_selected_down(self):
        selected_ids = self.tree.selection()
        if len(selected_ids) != 1:
            self.log("Please select exactly one item to move down.")
            return

        sid = selected_ids[0]
        item = self.tree_item_map.get(sid)
        if not item:
            self.log("Selected item not found in map.")
            return

        idx = next(i for i, obj in enumerate(test_sequence) if obj is item)
        if idx == len(test_sequence) - 1:
            self.log("Item is already at the bottom.")
            return

        test_sequence[idx], test_sequence[idx + 1] = test_sequence[idx + 1], test_sequence[idx]
        self.rebuild_tree()
        self.log("Moved item down.")

    def wrap_in_loop(self):
        selected_ids = self.tree.selection()
        if not selected_ids:
            self.log("No items selected to wrap in loop.")
            return

        selected_items = []
        for sid in selected_ids:
            if sid in self.tree_item_map:
                selected_items.append(self.tree_item_map[sid])

        indices = []
        for i in selected_items:
            if i not in test_sequence:
                self.log("Some selected item is not top-level or not found.")
                return
            indices.append(test_sequence.index(i))

        # Sort indices in reverse order so we can remove items without affecting other indices
        sorted_ix = sorted(indices, reverse=True)
        
        dialog = tk.Toplevel(self)
        dialog.title("Wrap in Loop")
        ttk.Label(dialog, text="Loop repeat count:").grid(row=0, column=0, padx=5, pady=5)
        count_var = tk.StringVar(value="2")
        ttk.Entry(dialog, textvariable=count_var).grid(row=0, column=1, padx=5, pady=5)

        def on_ok():
            try:
                loop_count = int(count_var.get())
                loop_item = {"type": "loop", "count": loop_count, "tasks": []}
                for ix in sorted_ix[::-1]:
                    loop_item["tasks"].insert(0, test_sequence.pop(ix))
                first_ix = sorted_ix[0]
                test_sequence.insert(first_ix, loop_item)
                dialog.destroy()
                self.rebuild_tree()
                self.log(f"Wrapped {len(selected_items)} items in a new loop (x{loop_count}).")
            except ValueError:
                self.log("Loop count must be an integer!")

        ttk.Button(dialog, text="OK", command=on_ok).grid(row=1, column=0, columnspan=2, pady=10)

    # ------------------------------------------------------------------------
    # 7. Saving and Loading the Sequence
    # ------------------------------------------------------------------------
    def save_sequence(self):
        file_path = filedialog.asksaveasfilename(
            title="Save Sequence",
            defaultextension=".json",
            filetypes=[("JSON Files", "*.json"), ("All Files", "*.*")]
        )
        if not file_path:
            self.log("Save canceled.")
            return

        data = {
            "node_list": node_list,
            "test_sequence": test_sequence
        }
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            self.log(f"Saved sequence to {file_path}")
        except Exception as e:
            self.log(f"Error saving file: {e}")

    def load_sequence(self):
        file_path = filedialog.askopenfilename(
            title="Load Sequence",
            defaultextension=".json",
            filetypes=[("JSON Files", "*.json"), ("All Files", "*.*")]
        )
        if not file_path:
            self.log("Load canceled.")
            return

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            global node_list, test_sequence
            node_list = data.get("node_list", [])
            test_sequence = data.get("test_sequence", [])
            self.refresh_node_listbox()
            self.rebuild_tree()
            self.log(f"Loaded sequence from {file_path}")
        except Exception as e:
            self.log(f"Error loading sequence: {e}")

    # ------------------------------------------------------------------------
    # 8. Running the Test Suite (Dummy Implementation)
    # ------------------------------------------------------------------------
    def run_suite_threaded(self):
        t = threading.Thread(target=self.run_suite, daemon=True)
        t.start()

    def run_suite(self):
        self.log("=== Running Test Suite ===")
        self.execute_block(test_sequence)
        self.log("=== Test Suite Complete ===")

    def execute_block(self, block):
        for item in block:
            if item["type"] == "command":
                self.handle_command(item)
            elif item["type"] == "delay":
                self.handle_delay(item)
            elif item["type"] == "loop":
                self.handle_loop(item)

    def handle_command(self, item):
        cmd = item["command"]
        nodes = item.get("nodes", [])
        node_names = ", ".join([n["name"] for n in nodes]) if nodes else "None"
        self.log(f"Executing command '{cmd}' on nodes: {node_names} (dummy).")
        time.sleep(1)

    def handle_delay(self, item):
        secs = item["seconds"]
        self.log(f"Delaying for {secs} seconds (dummy)...")
        time.sleep(secs)

    def handle_loop(self, item):
        count = item["count"]
        tasks = item["tasks"]
        self.log(f"Starting loop, repeating {count} times (dummy)...")
        for i in range(count):
            self.log(f"  Loop iteration {i+1}/{count}")
            self.execute_block(tasks)

##############################################################################
# Main
##############################################################################
if __name__ == "__main__":
    app = TestSuiteGUI()
    app.mainloop()
