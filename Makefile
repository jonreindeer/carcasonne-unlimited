.PHONY: build clean run watch

build:
	tsc src/game.ts --outFile dist/game.js --target ES2015 --lib ES2015,DOM
	cp src/index.html dist/
	cp -r src/carcasonne-tiles dist/

clean:
	rm -rf dist

run: build
	@echo "Starting server at http://localhost:8000"
	@echo "Press Ctrl+C to stop"
	python3 -m http.server 8000 --directory dist

watch:
	@echo "Watching for changes..."
	@while true; do \
		inotifywait -e modify src/game.ts 2>/dev/null || fswatch -1 src/game.ts 2>/dev/null || sleep 2; \
		make build; \
	done
