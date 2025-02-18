import sys
from openpyxl import Workbook
from datetime import datetime, timedelta

# OS-specific date/time format (includes seconds)
if sys.platform.startswith("win"):
    date_format = "%#m/%#d/%y %#H:%M:%S"
else:
    date_format = "%-m/%-d/%y %-H:%M:%S"

def format_time(dt):
    return dt.strftime(date_format)

# Create the workbook and sheet
wb = Workbook()
ws = wb.active
ws.title = "Thruster_1"
ws.append(["time", "vDIG", "vACT", "Current_Draw"])

# Simulation parameters
start_time = datetime(2025, 2, 18, 0, 0, 0)
total_seconds = 300  # 5 minutes
interval = 1         # 1 second sampling
num_points = total_seconds // interval

# Spikes occur every 30 seconds, each lasting 1 second
spike_starts = [30, 60, 90, 120, 150]
spike_duration = 1

# Baseline values
vDIG_base = 5.0
vACT_base = 12.0
current_base = 1.0

# Spike values
vDIG_spike = 10.0
vACT_spike = 30.0
current_spike = 2.0

for i in range(num_points):
    current_time = start_time + timedelta(seconds=i)
    time_str = format_time(current_time)

    # Check if we're in a 1-second spike window
    # i.e. [spike_start, spike_start + 1)
    in_spike = any(s_start <= i < s_start + spike_duration for s_start in spike_starts)

    if in_spike:
        # Spike
        vDIG = vDIG_spike
        vACT = vACT_spike
        current = current_spike
    else:
        # Baseline
        vDIG = vDIG_base
        vACT = vACT_base
        current = current_base

    ws.append([
        time_str,
        round(vDIG, 2),
        round(vACT, 2),
        round(current, 2)
    ])

# Save the workbook
output_filename = "thruster_spike_demo.xlsx"
wb.save(output_filename)
print(f"Excel file '{output_filename}' created successfully.")
