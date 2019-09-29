// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// Objects that hold static data
var dataFile = {};
  
// Objects that hold player choices
var  flags = null;

loadAll().then((data) => 
  {
    dataFile = data[0];
    flags = data[1];
  });
function loadAll()
{
  return Promise.all([getDataJSON("/dataFile.json") ]);
}
function getDataJSON(filename)
{
  console.log("Loading "+ filename +"...")
  return fetch(filename)
    .then( (response) => response.json());
}

function updateFlag(flagType,node)
{
  var choice = "";
  switch(flagType)
  {
    case "radio":
      if(flags[node] == true)
      {
        document.getElementById(node).classList.remove('selected');  
        flags[node] = false;
        return;
      }
      if(flags[node] != null)
      {
        document.getElementById(node).classList.remove('selected');
      }
      flags[node] = true;
      document.getElementById(node).classList.add('selected');
      return;
    
    case "checkboxes":
      {  
        if(flags[node] == true)
        {
          document.getElementById(node).classList.remove('selected');  
          flags[node] = false;
          return;
        }
        if(flags[node] != null)
        {
          document.getElementById(node).classList.add('selected');  
          flags[node] = true;
          return;
        }
      }
      break;
    case "increment":
      {
        flags[node][choice] = 1 + flags[node][choice];
      }
      return;
      
    case "decrement":
      {
        if(flags[node][choice] > 0)
        {
          flags[node][choice] = -1 + flags[node][choice];
        } else {
          flags[node][choice] = 0;
        }
      }
      return;
      
    default:
      flags[node] = choice;
      break;
  } 
}
