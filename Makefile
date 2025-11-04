.PHONY: build clean run

build:
	tsc game.ts --outFile game.js --target ES2015 --lib ES2015,DOM

clean:
	rm -f game.js

run: build
	@echo "Starting server at http://localhost:8000"
	@echo "Press Ctrl+C to stop"
	python3 -m http.server 8000

watch:
	@echo "Watching for changes..."
	@while true; do \
		inotifywait -e modify game.ts 2>/dev/null || fswatch -1 game.ts 2>/dev/null || sleep 2; \
		make build; \
	done
