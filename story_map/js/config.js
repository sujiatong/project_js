/*
Welcome to the config.js file
It holds the actual content of chapters, the transitions, and other
important information for the storymap.
########################################################################
Contents:
*/

/*
########################################################################
HEADER SECTION
*/
let topTitleDiv = "<h4>MUSA-6110 Javascript</h4>";
let titleDiv = "<h1>Storymap project </h1>";
let bylineDiv = "<p>Jiatong Su<br>September 2024</p>";
let descriptionDiv = `
<p>Welcome!</p>
<p>This story map project visuslazes Metrorail system between LA and DC.
The Metrorail systems in Washington, D.C. (WMATA) and Los Angeles (Metro Rail) are two separate transit systems, 
each serving their respective metropolitan areas.</q>
<div style="max-width:100%; text-align:center; margin-left:auto; margin-right:auto">

<p><br></p>
<p style="text-align:center">Scroll to continue<br>▼</p>
`;

/*
########################################################################
CHAPTERS
*/

let divChapter1 =`
<h3>Comparing metrorail LA and DC</h3>
<p>The D.C. Metro is designed for a dense, commuter-heavy region, while L.A.'s Metro Rail 
is aimed at connecting a sprawling, car-dependent urban area with public transit, 
though its usage is lower by comparison. </p>
`;

let divChapter2 =`
<h3><a href="https://opendata.dc.gov/datasets/DCGIS::metro-lines-regional/about">Washington Metro</a> 
</h3>

<p>Metro serves Washington, D.C., as well as several jurisdictions in the states of Maryland and Virginia. 
In Maryland, Metro provides service to Montgomery and Prince George's counties; in Virginia, 
to Arlington, Fairfax and Loudoun counties, and to the independent city of Alexandria. 
The system's most recent expansion, which is the construction of a new station (and altering the line), 
serving Potomac Yard, opened on May 19, 2023. It operates mostly as a deep-level subway in more densely 
populated parts of the D.C. metropolitan area (including most of the District itself), 
while most of the suburban tracks are at surface level or elevated. The longest single-tier escalator in the Western 
Hemisphere, spanning 230 feet (70 m), is located at Metro's deep-level Wheaton station.</p>
`;


let divChapter3 =`
<h3><a href="https://opendata.dc.gov/datasets/DCGIS::metro-stations-regional/about">Union Station</a></h3>

<p>Washington Union Station, known locally as Union Station, is a major 
train station, transportation hub, and leisure destination in Washington, 
D.C. Designed by Daniel Burnham and opened in 1907, it is Amtrak's headquarters, 
the railroad's second-busiest station, and North America's 10th-busiest railroad station. The station is the southern terminus of the Northeast Corridor, 
an electrified rail line extending north through major cities including Baltimore, 
Philadelphia, New York City, and Boston, and the busiest passenger rail line in the nation. 
In 2015, it served just under five million passengers.</p>
`;

let divChapter4 =`
<h3><a href="https://en.wikipedia.org/wiki/Los_Angeles_Metro_Rail">Los Angeles Metro Rail</a></h3>
<p>The Los Angeles Metro Rail is an urban rail transit system serving Los Angeles County, 
California in the United States. It consists of six lines: four light rail lines (the A, C, E and K lines) 
and two rapid transit lines (the B and D lines), serving a total of 101 stations. 
The system connects with the Metro Busway bus rapid transit system (the G and J lines), 
the Metrolink commuter rail system, as well as several Amtrak lines. Metro Rail is owned and operated 
by the Los Angeles County Metropolitan Transportation Authority (Metro).</p>
`;


let divChapter5 =`
<h3><a href="https://en.wikipedia.org/wiki/Union_Station_(Los_Angeles)">Union Station</a></h3>
</h3>

<P>Los Angeles Union Station is the main train station in Los Angeles, California, and the largest passenger rail terminal in the Western United States.
It opened in May 1939 as the Los Angeles Union Passenger Terminal, 
replacing La Grande Station and Central Station.</P>
`;

/*
########################################################################
FOOTER SECTION
*/

let footerDiv = `
<p>>MUSA-6110 Javascript</p>
`;

/*
########################################################################
MAP AND TRANSITIONS - THE MAIN CONFIGURATION SECTION
*/

var config = 
{
  // map style from mapbox
  style: "mapbox://styles/mapbox/light-v11",

  // My own Mapbox token!
  accessToken: "pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA",
  showMarkers: false,
  markerColor: "#242422",
  theme: "light",
  use3dTerrain: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,
  chapters: 
  [
    // CHAPTER 1
    {
      id: "US_overall",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter1,
      location: 
      {
        center: [-100, 38.8],
        zoom: 3,
        zoomSmall: 5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      
    },
      //CHAPTER 2
    {
      id: "DC metro line",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      location: {
        center: [-77, 38.889805],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [

          {
            layer: "DC line",
            opacity: 1,
            duration: 1,
          },
          {
            layer:"DC station",
            opacity: 1,
            duration: 1,
          },

        ],
        onChapterExit: [

            {
              layer: "DC line",
              opacity: 1,
              duration: 1,
            },
            {
              layer:"DC station",
              opacity:1,
              duration: 1,
            }
        ],

      },


      //CHAPTER 3
      {
        id: "DC_UNION",
        alignment: "right",
        hidden: false,
        title: "",
        image: "",
        description: "",
        chapterDiv: divChapter3,
        location: {
          center: [-77.006332, 38.897095],
          zoom: 16,
          zoomSmall: 9,
          pitch: 0,
          bearing: 0,
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",
        onChapterEnter: [

          {
            layer: "DC line",
            opacity: 0,
            duration: 1,
          },
          {
            layer:"DC station",
            opacity: 1,
            duration: 1,
          },

        ],
        onChapterExit: [

            {
              layer: "DC line",
              opacity: 0,
              duration: 1,
            },
            {
              layer:"DC station",
              opacity:1,
              duration: 1,
            }
        ],

      },

    // CHAPTER 4
    {
      id: "LA_line",
      alignment: "right",
      hidden: false,
      chapterDiv: divChapter4,
      location: 
      {
        center: [-118.24, 34.05],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "LA line",
          opacity: 1,
          duration: 1,
        },
      ],
      onChapterExit: [
          {
            layer: "LA line",
            opacity: 1,
            duration: 1,
          },
        ],    

    },

      //CHAPTER 5
      {
        id: "LA_UNION",
        alignment: "right",
        hidden: false,
        title: "",
        image: "",
        description: "",
        chapterDiv: divChapter5,
        location: {
          center: [-118.233443, 34.055592],
          zoom: 16,
          zoomSmall: 9,
          pitch: 0,
          bearing: 0,
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",

      },


  ]
};