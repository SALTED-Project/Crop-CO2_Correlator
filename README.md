# Crop-CO2 correlator

## Introduction

#### 📝 Description
Crop-CO2 correlator is a map-based web application that allows joint visualisation of agricultural parcels (crops) and air quality metrics (CO2) in a given location. Furthermore, it automatically generates several graphs that address the statistical results obtained when correlating both metrics.

#### 🏆 Value Proposition
Currently, markets such as the spanish market allow companies to plant forests to obtain permits for CO2 emissions of equivalent magnitude. At SALTED, we have considered the possibility of adding crop plantations to the equation, rather than relying solely on forests. This application aims to provide a large-scale study that proves CO2 emissions compensated by forests are of the same order as those compensated by several kinds of crops.

#### 🎯 End User Frontend
The user can interact with the application in several ways. Aside from a login page that the application provider may choose to activate, there is a main screen where all the controls are located. Most of it is covered by an interactive map, where the user can zoom in and out, pan, and hover over the represented polygons to read tooltips. On the left hand side, there are four buttons that allow the user to hide or display certain information (CO2, all crops, or individual crops) on the map or have a look at the interactive graphs.

<img src="https://github.com/SALTED-Project/Crop-CO2_Correlator/tree/main/img/map.png" alt="Map" width="100%"/> <img src="https://github.com/SALTED-Project/Crop-CO2_Correlator/tree/main/img/graph.png" alt="Graph" width="100%"/>

#### 📧 Contact
This application was co-developed by [Amper](https://www.grupoamper.com/) and [Universidad de Cantabria](https://web.unican.es/) ([contact](https://salted-project.eu/contact/)).

## Installation
The most simple and effective way of installing the application is by using the provided *Dockerfile*. Before installing it, however, you may want to adapt the application to your particular needs. You can do that by modifying the *.env* configuration file. Next you can run the command (it may take several minutes to build, do not panic):
```bash
docker build -t <image-name> .
```
You can choose the image name freely. Finally, you can just run a docker container:
```bash
docker run -p <port>:80 <image-name>
```
In this case, you can choose the port freely. Congratulations, the application is up and running!

## Acknowledgement
This work was supported by the European Commission CEF Programme by means of the project SALTED ‘‘Situation-Aware Linked heTerogeneous Enriched Data’’ under the Action Number 2020-EU-IA-0274.

## License
This material is licensed under the GNU Lesser General Public License v3.0 whose full text may be found at the *LICENSE* file.

It mainly makes use of the following libraries and frameworks (dependencies of dependencies have been omitted):

| Library / Framework |   Licence    |
|---------------------|--------------|
| apexcharts          | MIT          |
| core-js             | MIT          |
| vue                 | MIT          |
| vue-router          | MIT          |
| vue2-leaflet        | MIT          |
