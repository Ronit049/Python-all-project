import time
import os
from clapDetector import ClapDetector, printDeviceInfo

sites = [
    "https://chat.openai.com/",
    "https://claude.ai/",
    "https://x.com/",
    "https://www.youtube.com/"
]

print("Available microphones:")
printDeviceInfo()

print("\nListening... Double clap to open ChatGPT, Claude, X, and YouTube.")

clapDetector = ClapDetector(inputDevice=1, logLevel=10)
clapDetector.initAudio()

clap_count = 0
first_clap_time = 0
last_clap_time = 0
last_open_time = 0

DOUBLE_CLAP_WINDOW = 3.0
MIN_GAP_BETWEEN_CLAPS = 0.15
COOLDOWN_AFTER_OPEN = 10

try:
    while True:
        audioData = clapDetector.getAudio()

        result = clapDetector.run(
            thresholdBias=4000,
            lowcut=200,
            highcut=3200,
            audioData=audioData
        )

        now = time.time()

        if len(result) >= 1:
            if now - last_clap_time > MIN_GAP_BETWEEN_CLAPS:
                clap_count += 1
                last_clap_time = now

                print(f"Clap count: {clap_count}")

                if clap_count == 1:
                    first_clap_time = now

                elif clap_count >= 2:
                    if now - first_clap_time <= DOUBLE_CLAP_WINDOW:
                        if now - last_open_time > COOLDOWN_AFTER_OPEN:
                            print("Double clap detected! Opening websites...")

                            for site in sites:
                                os.startfile(site)
                                time.sleep(0.5)

                            last_open_time = now

                        clap_count = 0
                        first_clap_time = 0

        if clap_count == 1 and now - first_clap_time > DOUBLE_CLAP_WINDOW:
            print("Timeout. Try double clap again.")
            clap_count = 0
            first_clap_time = 0

        time.sleep(1 / 60)

except KeyboardInterrupt:
    print("Stopped.")
finally:
    clapDetector.stop()