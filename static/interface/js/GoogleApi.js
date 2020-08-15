// Client ID and API key from the Developer Console
var CLIENT_ID = '374169744841-5a12hnmpq5jlkcolu32j0idl1ndfcc13.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBDPyH3rItE1rN1SxZeFEV3DoTxdduHBVU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    //adding google docs api client load\
    loadClient();


    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listFiles();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}



//loading google docs in iframe
function loadFile(id) {
  document.getElementById("google_docs_frame").src = "https://drive.google.com/open?id="+id ;
}

/**
 * Print files.
 */
function listFiles() {
  gapi.client.drive.files.list({  //'q': "mimeType = 'application/vnd.google-apps.folder'",
    'pageSize': 20,
    'fields': "nextPageToken, files(id, name,parents,mimeType)",
    'trashed' : false
  }).then(function(response) {
    //appendPre('Files:');
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //appendPre(file.name + ' (' + file.id + ')');
      
        document.getElementById("drive_files1").insertAdjacentHTML('afterend', `<b onclick='loadFile("${file.id}")'> ${file.name} </b>` );
        console.log(file);

       // htmlAdd(file.name,file.id);
        
      }
    } else {
      appendPre('No files found.');
    }
  });
}



////////////////////////////// google docs api

function loadClient() {
  gapi.client.setApiKey("AIzaSyBDPyH3rItE1rN1SxZeFEV3DoTxdduHBVU");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/docs/v1/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.docs.documents.create({
    "resource": {
      "title": "New DOC Added REname it....."
    }
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response,response.documentId,response.title);
              document.getElementById("drive_files1").insertAdjacentHTML('afterend', `<b onclick='loadFile("${response.result.documentId}")'> ${response.result.title} </b>` );
              loadFile(response.result.documentId);

            },
            function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
});
 



/*
/////neew doc api

<script src="https://apis.google.com/js/api.js"></script>
<script>
  /**
   * Sample JavaScript code for docs.documents.create
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */
  
   /*

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/docs/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.docs.documents.create({
      "resource": {
        "title": "welcome  to Docs Api ........."
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>

*/