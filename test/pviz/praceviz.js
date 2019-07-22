looker.plugins.visualizations.add({
    create: function(element, config) {
        var css = element.innerHTML = `
        <style>
          .main {
            // Vertical centering
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }

        </style>
      `;
      // Create a container element to let us center the text.
  var container = element.appendChild(document.createElement("div"));
  container.className = "main";

  // Create an element to contain the text.
  this._textElement = container.appendChild(document.createElement("div"));

    },
    updateAsync: function(data, element, config, queryResponse, details, done) {
         // Grab the first cell of the data.
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];
        console.log(firstRow);
        console.log(queryResponse.fields.dimensions);
    // Insert the data into the page.
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    // Always call done to indicate a visualization has finished rendering.
    done()
    }
  })