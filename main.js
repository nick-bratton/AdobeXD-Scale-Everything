const { selection } = require("scenegraph")
const { Artboard, Rectangle, Ellipse, Text } = require("scenegraph");
let panel;

function create() {
	const HTML =
			`<style>
					.break {
							flex-wrap: wrap;
					}
					label.row > span {
							color: #8E8E8E;
							width: 20px;
							text-align: right;
							font-size: 9px;
					}
					label.row input {
							flex: 1 1 auto;
					}
					.show {
							display: block;
					}
					.hide {
							display: none;
					}
			</style>
			<form method="dialog" id="main">
					<div class="row break">
							<label class="row">
									<span>↕︎</span>
									<input type="number" uxp-quiet="true" id="inputScaleFactor" placeholder="Scale Factor (e.g., 2)" />
							</label>
					</div>
					<footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
			</form>
			<p id="warning">Select something to scale or CMD+A to select everything.</p>
			`
	function scale() {
			const { editDocument } = require("application");
			const scaleFactor = Number(document.querySelector("#inputScaleFactor").value);

			editDocument({ editLabel: "Scale selection" }, function (selection) {
					
					// 1. need to handle locked items
					// console.log(selection.itemsIncludingLocked.length);

					// 2. need to reposition and scale probably  

					// 3. need to handle shadows, strokes, blur, background blur, vectors


					if (selection.items[0].constructor.name == 'Artboard'){
						// let artboard = selection.items[0];
						// artboard.resize(artboard.localBounds.width *= scaleFactor, artboard.localBounds.height *= scaleFactor);
						scaleArtboardAndItsChildren(selection, scaleFactor);
					}
					else {
						scaleSelection(selection, scaleFactor);
					}
			})
	}

	panel = document.createElement("div");
	panel.innerHTML = HTML;
	panel.querySelector("form").addEventListener("submit", scale);

	return panel;
}

function applyModifications (node, scaleFactor){
	switch (node.constructor.name){
		case 'Rectangle':
			// what about cornerRadii?
			node.width *= scaleFactor;
			node.height *= scaleFactor;
			break;
		case 'Polygon':
			// what about cornerRadii?
			node.width *= scaleFactor;
			node.height *= scaleFactor;
			break;
		case 'Ellipse':
				node.radiusX *= scaleFactor;
				node.radiusY *= scaleFactor;
			break;
		case 'Line':
				node.resize(node.localBounds.width *= scaleFactor, node.localBounds.height *= scaleFactor);
			break;
		case 'Text':
				node.fontSize *= scaleFactor;
				node.lineSpacing *= scaleFactor;
			break;
		case 'Group':
				node.resize(node.localBounds.width *= scaleFactor, node.localBounds.height *= scaleFactor);
			break;
		case 'SymbolInstance':
				node.resize(node.localBounds.width *= scaleFactor, node.localBounds.height *= scaleFactor);
			break;
		default: 
			console.log('This plugin does not know how to handle layers of type: ' + node.constructor.name);
	}
}

function scaleSelection(selection, scaleFactor){
	selection.items.forEach(function (child){
		applyModifications(child, scaleFactor);
	});
}

function scaleArtboardAndItsChildren(selection, scaleFactor){
	let artboard = selection.items[0];
	artboard.resize(artboard.localBounds.width *= scaleFactor, artboard.localBounds.height *= scaleFactor);
	artboard.children.forEach(function (child) {
		applyModifications(child, scaleFactor);
	});
}

function show(event) {
		if (!panel) event.node.appendChild(create());
}

module.exports = {
		panels: {
				scaleEverything: {
						show,
				}
		}
};