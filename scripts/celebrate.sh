#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title celebrate
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🍻

# Documentation:
# @raycast.description Celebrate!
# @raycast.author guipolive
# @raycast.authorURL https://raycast.com/gui_passosdeoliveira

times=2
interval=1

if [ -n "$1" ]; then
    times=$1
fi
if [ -n "$2" ]; then
    interval=$(($2))
fi

for i in $(seq 1 $times); do
    open raycast://confetti
    echo "Celebrate  🎉"
    sleep $interval
done
