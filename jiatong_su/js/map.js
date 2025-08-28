/*
Welcome to the map.js file
This file contains all the JavaScript code that will power the storymap.
########################################################################
Contents:
General Variables
- smallMedia
- layerTypes
- alignments

General Functions
- getLayerPaintType
- setLayerOpacity

Story and Chapter Elements
- story
- features
- header
- footer

Set up innerHTML
Generate chapters with createChapterElements
and then create the map element and add the layers
with scrollama
*/

/*The variable smallMedia defines the maximum width of the screen
that will be considered a small screen */
var smallMedia = window.matchMedia("(max-width: 600px)").matches;

/* The variable layerTypes is a dictionary that holds the types of layers 
that can be used in the map. It contains the respective opacity properties
for each layer type */
var layerTypes = {
    fill: ["fill-opacity"],
    line: ["line-opacity"],
    circle: ["circle-opacity", "circle-stroke-opacity"],
    symbol: ["icon-opacity", "text-opacity"],
    raster: ["raster-opacity"],
    "fill-extrusion": ["fill-extrusion-opacity"],
    heatmap: ["heatmap-opacity"],
  };
  
/* The variable alignments is a dictionary that holds the alignment options for the chapters */
var alignments = {
left: "lefty",
center: "centered",
right: "righty",
full: "fully",
};

/* These two functions help turn on and off individual
layers through their opacity attributes: The first one returns
the type of layer and the second one adjusts the layer's opacity */

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
  }
  
function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
      var options = {};
      if (layer.duration) {
        var transitionProp = prop + "-transition";
        options = { duration: layer.duration };
        map.setPaintProperty(layer.layer, transitionProp, options);
      }
      map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
  }
  
/* These variables and functions create the story and chapter html
elements, and populate them with the content from the config.js file.
They also assign a css class to certain elements, also based on the
config.js file */

// Set up the main 'story', 'features', 'header', and 'footer' elements
var story = document.getElementById("story");
var features = document.createElement("div");
var header = document.createElement("div");
var footer = document.createElement("div");

// Set the id of the features element to “features”
features.setAttribute("id", "features");

// If each header element exists in the config.js file, it is created through innerHTML.
// In other words, this part generates the HTML based on values in the config.js file.
if (config.topTitle) {
    var topTitle = document.createElement("div");
    topTitle.innerHTML = config.topTitle;
    header.appendChild(topTitle);
}

if (config.title) {
    var titleText = document.createElement("div");
    titleText.innerHTML = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement("div");
    subtitleText.innerHTML = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement("div");
    bylineText.innerHTML = config.byline;
    header.appendChild(bylineText);
}

if (config.description) {
    var descriptionText = document.createElement("div");
    descriptionText.innerHTML = config.description;
    header.appendChild(descriptionText);
}
  
// This part ensures that the header is only appended to the story if it actually contains content.
if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute("id", "header");
    story.appendChild(header);
}

/* 
After building the elements and assigning content to the header,
these functions will loop through the chapters in the config.js file,
create the chapter elements and assign them their respective content
########################################################################
*/
config.chapters.forEach((record, idx) => { 
// idx represents the index of each record in the chapters array in config.js
   
    /* These first two variables will hold each chapter, with the chapter's
      content going into the container element */
    // The container will wrap around the chapter contents, representing a step in the scrolling process
    var container = document.createElement("div");
    var chapter = document.createElement("div");
    
    // Add the "br3" css class to the chapter (might be a mapbox class)
    chapter.classList.add("br3");
    
    // Add content to the chapter's div
    chapter.innerHTML = record.chapterDiv;
    
    // Set the id for the chapter's container and adds the step css attribute
    // The id here is useful for interaction (through scrolling).
    container.setAttribute("id", record.id);
    // The step class here would be used by Scrollama 
    container.classList.add("step");
    
    // If the chapter is the first one, set it to active (i.e. initialise the story)
    if (idx === 0) {
      container.classList.add("active");
    }
    
    // Add the overall theme (as set in config.js) to the chapter element
    chapter.classList.add(config.theme);
    
    /* Append the chapter to the container element and then the container
      element to the features element */
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || "centered");
    if (record.hidden) {
      container.classList.add("hidden");
    }
    features.appendChild(container);
  });

// Append the features element (with the chapters) to the story element
story.appendChild(features);

// Assign content to the footer element, if specified in the config.js file
if (config.footer) {
    var footerText = document.createElement("p");
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

// This part ensures that the footer is only appended to the story if it actually contains content
if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute("id", "footer");
    story.appendChild(footer);
}
  
// Adds the Mapbox access token as specified in the config.js file
mapboxgl.accessToken = config.accessToken;

/*
This function is likely used to modify requests made to external APIs or resources 
by appending a custom query parameter (pluginName=scrollytellingV2), 
potentially to track the origin of requests or include additional metadata about 
the plugin being used. No harm including it here.
*/
const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery
      ? "&pluginName=scrollytellingV2"
      : "?pluginName=scrollytellingV2";
    return {
      url: url + suffix,
    };
  };
  
/*
Create a variable to hold the starting zoom value
*/
var startingZoom;

// If the screen size is small, it uses the `zoomSmall` value
if (smallMedia) {
  startingZoom = config.chapters[0].location.zoomSmall;
} else {
  startingZoom = config.chapters[0].location.zoom;
}

/*
At last! 
Create the map element with attributes specified in the config.js file
########################################################################
*/
var map = new mapboxgl.Map({
    container: "map",
    style: config.style, // E.G. "mapbox://styles/mapbox/light-v11" as specified in config.js
    center: config.chapters[0].location.center, // initial geographical center point of the map
    zoom: startingZoom,
    bearing: config.chapters[0].location.bearing, // bearing controls the rotation of the map in degrees (from north)
    pitch: config.chapters[0].location.pitch, // pitch defines the tilt angle (in degrees) of the map from the default top-down view
    interactive: false, // prevents the user from interacting with the map, such as zooming in or out
    transformRequest: transformRequest,
  });
  
// Check if markers should be shown on the map
if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// Initialise the scrollama function
var scroller = scrollama();

/* 
Now, add the layers to the map.
For this template storymap, we have the following layers:
1. DC line (line) from https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Rail_Bus_WebMercator/MapServer/58/query?outFields=*&where=1%3D1&f=geojson
2. DC stations (circle) from https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Rail_Bus_WebMercator/MapServer/51/query?outFields=*&where=1%3D1&f=geojson
3. LA metro line from https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/MTA_Metro_Lines/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson

########################################################################
*/
map.on("load", function () {
    // 1. DC_metro_line_layer (line)
    map.addLayer({
      id: "DC line",
      type: "line",
      source: {
          type: "geojson",
          data: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Rail_Bus_WebMercator/MapServer/58/query?outFields=*&where=1%3D1&f=geojson"
      },
      paint: {
          // Using 'match' to map the 'Name' property to specific colors
          "line-color": [
              'match',
              ['get', 'NAME'],  // Get the 'Name' property from the data
              'red', '#FF0000',      // Red Line = Red
              'blue', '#0000FF',     // Blue Line = Blue
              'yellow', '#FFFF00',   // Yellow Line = Yellow
              'green', '#00FF00',    // Green Line = Green
              'orange', '#FFA500',   // Orange Line = Orange
              'silver', '#C0C0C0',   // Silver Line = Silver
              '#888888'              // Default color (if 'Name' doesn't match any)
          ],
          "line-width": 5  // Set the line width
      }
  });
  
  


    // 2. Metro Stations Regional (circle)
    map.addLayer({
        id: "DC station",
        type: "circle",
        source: {
            type: "geojson",
            data: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Rail_Bus_WebMercator/MapServer/51/query?outFields=*&where=1%3D1&f=geojson"
        },
        paint: {
            "circle-color": "#707B7C",  // Replace with the desired color
            "circle-radius": 5,  // Adjust as needed
            "circle-stroke-color": "#707B7C",
            "circle-stroke-width": 1
        }, 
    });

    // 3. LA METRO_layer (fill)
    map.addLayer({
      id: "LA line",
      type: "line",
      source: {
          type: "geojson",
          data: "https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/MTA_Metro_Lines/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
      },
      paint: {
          // Using 'match' to map the 'Name' property to specific colors
          "line-color": [
              'match',
              ['get', 'LABEL'],  // Get the 'Name' property from the data
              'Metro B Line (Red)', '#FF0000',      // Red Line = Red
              'Metro A Line (Blue)', '#0000FF',     // Blue Line = Blue
              'Metro L Line (Gold)', '#FFD700',   // Yellow Line = Yellow
              'Metro C Line (Green)', '#00FF00',    // Green Line = Green
              'Metro G Line (Orange)', '#FFA500',   // Orange Line = Orange
              'Metro J Line (Silver)', '#C0C0C0',   // Silver Line = Silver
              'Metro D Line (Purple)', '#800080',
              '#888888'              // Default color (if 'Name' doesn't match any)
          ],
          "line-width": 5  // Set the line width
      }
  });

      // 4. Metro Stations Regional (circle)
    map.addLayer({
        id: "LA station",
        type: "circle",
        source: {
            type: "geojson",
            data: "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/185/query?outFields=*&where=1%3D1&f=geojson"
        },
        paint: {
            "circle-color": "#707B7C",  // Replace with the desired color
            "circle-radius": 5,  // Adjust as needed
            "circle-stroke-color": "#707B7C",
            "circle-stroke-width": 1
        }, 
    });

  

    
  
    // Use the scrollama library to manage scrolling events in the storymap 
    scroller
      .setup({
        step: ".step", // .step being the class that triggers the scrolling event
        offset: 0.55, // an element is considered active when it is 75% in the viewport
        progress: true, // add a progress indicator tracking how far along a step is relative to the viewport
      })
      .onStepEnter((response) => { // defines a callback function triggered when a step becomes active (i.e. when it enters the viewport).
        var chapter = config.chapters.find( // finds the corresponding chapter configuration based on the id
          (chap) => chap.id === response.element.id
        );
        response.element.classList.add("active"); // adds the active class to the element
        let thisZoom;
        if (smallMedia) {
          thisZoom = chapter.location.zoomSmall;
        } else {
          thisZoom = chapter.location.zoom;
        }
        thisLocation = {
          bearing: chapter.location.bearing,
          center: chapter.location.center,
          pitch: chapter.location.pitch,
          zoom: thisZoom,
        };
        map[chapter.mapAnimation || "flyTo"](thisLocation);
        if (config.showMarkers) {
          marker.setLngLat(chapter.location.center); // update the position of the marker if markers are to be shown
        }
        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        if (chapter.callback) {
          window[chapter.callback](); // calls the custom callback function specified in chapter.callback if it exists
        }
        if (chapter.rotateAnimation) {
          map.once("moveend", function () {
            const rotateNumber = map.getBearing();
            map.rotateTo(rotateNumber + 90, {
              duration: 24000,
              easing: function (t) {
                return t;
              },
            });
          });
        }
      })
      .onStepExit((response) => { // defines a callback function that is triggered when a step exits the viewport
        var chapter = config.chapters.find(
          (chap) => chap.id === response.element.id
        );
        response.element.classList.remove("active"); // removes the active class from the element
        if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(setLayerOpacity);
        }
      });
  });


  
  /* Here we watch for any resizing of the screen to
  adjust our scrolling setup */
  window.addEventListener("resize", scroller.resize);
