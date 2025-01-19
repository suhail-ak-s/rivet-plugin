# Rivet Intermediate Output Plugin

A debugging utility plugin for Rivet that helps you analyze data flow in your graphs by capturing and displaying intermediate outputs.

[![Author: Suhail Ak](https://img.shields.io/badge/Author-Suhail%20Ak-blue.svg)](https://github.com/suhail-ak-s)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

This plugin adds an Intermediate Output node to [Rivet](https://github.com/Ironclad/rivet), which is useful for debugging and analyzing data flow in your graphs. It allows you to capture and display intermediate outputs at any point in your graph.

## Features

- Capture and display intermediate outputs
- Add descriptions to document what you're capturing
- Pass through functionality to maintain graph flow
- Useful for debugging and analysis

## Installation

To use this plugin in Rivet:

1. Open the plugins overlay at the top of the screen
2. Search for "rivet-intermediate-output"
3. Click the "Install" button to install the plugin into your current project

## Usage

The Intermediate Output node can be found in the Debug group of nodes. It provides:
- An input port for receiving data
- A description field for documentation
- An output port that passes through the input value
- A display of the current value in the node body

## Development

1. Run `yarn dev` to start the compiler and bundler in watch mode
2. After each change, restart Rivet to see the changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Suhail Ak**
- GitHub: [@suhail-ak-s](https://github.com/suhail-ak-s)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
