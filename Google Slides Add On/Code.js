
 /**
 * @OnlyCurrentDoc
 */

/**
 * Create a open menu item.
 * @param {Event} event The open event.
 */
function onOpen(e) {
  SlidesApp.getUi()
      .createMenu('CircuitVerse')
      .addItem('Insert Circuit', 'showSideBar')
      .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {Event} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSideBar() {
  // Display a sidebar with custom HtmlService content.
  
  var ui = HtmlService
      .createHtmlOutputFromFile('sidebar')
      .setTitle('CircuitVerse');
  SlidesApp.getUi().showSidebar(ui);
}

function getCircuitImagePath(id) {
  var queryUrl = `circuitverse.org/api/v1/projects/${id}/image_preview`;
  return JSON.parse(UrlFetchApp.fetch(queryUrl))["project_preview"];
}

function getProjectId(url) {
  var re1= /https:\/\/circuitverse\.org\/users\/\d*\/projects\/(.*)/;
  var re2 = /"https:\/\/circuitverse\.org\/simulator\/embed\/(.*?)"/;
  var re3 = /https:\/\/circuitverse\.org\/simulator\/edit\/(.*)/;
  var re4 = /https:\/\/circuitverse\.org\/simulator\/embed\/(.*)/;
  var re5 = /https:\/\/circuitverse\.org\/simulator\/(.*)/;
  
  if(re1.test(url)) return url.match(re1)[1];
  if(re2.test(url)) return url.match(re2)[1];
  if(re3.test(url)) return url.match(re3)[1];
  if(re4.test(url)) return url.match(re4)[1];
  if(re5.test(url)) return url.match(re5)[1];
  throw "The URL is incorrect";
}

function getEmbedPath(id) {
  return `https://circuitverse.org/simulator/embed/${id}`;
}

function embedCircuit(url) {
  var id = getProjectId(url);
  var imagePath = getCircuitImagePath(id);
  var embedPath = getEmbedPath(id);
  slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
  img = slide.insertImage(imagePath);
  img.setLinkUrl(embedPath);
}

function embedCircuitPreview(url) {
  var id = getProjectId(url);
  var imagePath = getCircuitImagePath(id);
  return imagePath;
}
