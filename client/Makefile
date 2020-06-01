add: ## Add a package
	yarn add $(package)
	cd ios && pod install
	react-native link $(package)
	yarn ios

reset: ## Reset all
	rm -rf node_modules
	yarn
