const { selection } = require("scenegraph")
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
		function scaleSelection() {
				const { editDocument } = require("application");
				const scaleFactor = Number(document.querySelector("#inputScaleFactor").value);

				editDocument({ editLabel: "Scale selection" }, function (selection) {
						const selectedRectangle = selection.items[0];
						selectedRectangle.width *= scaleFactor
						selectedRectangle.height *= scaleFactor
				})
		}

		panel = document.createElement("div");
		panel.innerHTML = HTML;
		panel.querySelector("form").addEventListener("submit", scaleSelection);

		return panel;
}

function show(event) {
		if (!panel) event.node.appendChild(create());
}

function update() {
		const { Rectangle } = require("scenegraph");
		let form = document.querySelector("form");
		let warning = document.querySelector("#warning");
		if (!selection || !(selection.items[0] instanceof Rectangle)) {
				form.className = "hide";
				warning.className = "show";
		} else {
				form.className = "show";
				warning.className = "hide";
		}
}


module.exports = {
		panels: {
				scaleEverything: {
						show,
						update
				}
		}
};