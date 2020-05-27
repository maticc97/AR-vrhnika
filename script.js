const Url = 'https://ar-muzej.herokuapp.com/';
const instructions = ["Usmeri kamero v marker, za prikaz 3D modela. Model lahko obračate s prstom po zaslonu, če pa želite o modelu izvedeti več informacij pa pritisnite na znak i v levem spodnjem kotu."];
var instructionsCount = 0;
var instructionsText;

function backBtnClicked() {
  if (this.instructionsCount == 3) {
    document.getElementById("forwardBtn").innerHTML = "Naprej";
  }
  if (this.instructionsCount > 0) {
    document.getElementById("instructionsText").innerHTML = instructions[this.instructionsCount-1];
    console.log(document.getElementById("instructionsText"));
    this.instructionsCount -= 1;
    if (this.instructionsCount == 0) {
      document.getElementById("backBtn").style.display = "none";
    }
  }
}

function forwardBtnClicked() {
  if (this.instructionsCount == 0) {
    document.getElementById("backBtn").style.display="block";
  }
  if (this.instructionsCount == 3) {
    this.closeInstructions();
  }
  if (this.instructionsCount < 3) {
    document.getElementById("instructionsText").innerHTML = instructions[this.instructionsCount+1];
    this.instructionsCount += 1;
    if (this.instructionsCount == 3) {
      document.getElementById("forwardBtn").innerHTML = "Zapri";
    }
  }
}

function openInstructions() {
  this.instructionsCount = 0;
  document.getElementById("forwardBtn").innerHTML = "Naprej";
  document.getElementById("backBtn").style.display = "none";
  document.getElementById("instructionsText").innerHTML = instructions[0];
  document.getElementById("myModal").style.display = "block";
}

function closeInstructions() {
  document.getElementById("myModal").style.display = "none";
  this.instructionsCount = 0;
}

function openNav() {
  var xmlhttp = new XMLHttpRequest();
  const data = {
    clicked: "Info",
    date: new Date().toLocaleString()
  }
  xmlhttp.open("POST", Url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(data));
  document.getElementById("overlay").style.display = "block";
}
function openNav() {
  document.getElementById("overlay").style.display = "block";
}

function closeNav() {
    document.getElementById("overlay").style.display = "none";
}

function startAnimation() {
  let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  if (this.model) {
    //
    this.model.setAttribute('visible', "false");
    this.secModel.setAttribute('visible',true);
    this.secModel.setAttribute('animation-mixer', {loop: "once"});
    setTimeout(function(){
      this.secModel.removeAttribute('animation-mixer');
      this.secModel.setAttribute('visible',false);
      this.model.setAttribute('visible',true);
    }, 5000);
  }
  
}

function rotateX(){
      let model = document.getElementById("model");
      let secModel = document.getElementById("secModel");
      let a = this.model.getAttribute('rotation');
      model.setAttribute('rotation', {x: a.x+5, y: a.y, z: a.z});
    
}

function rotateY(){
    let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  
  let a = this.model.getAttribute('rotation');
  model.setAttribute('rotation', {x: a.x, y: a.y+5, z: a.z});
}

function rotateZ(){
    let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");
  
  let a = this.model.getAttribute('rotation');
  model.setAttribute('rotation', {x: a.x, y: a.y, z: a.z+5});
}

function zoomin(){
   let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");

  let a = this.model.getAttribute('scale');
        this.model.setAttribute('scale',{x: a.x*1.1 ,y: a.y*1.1 ,z: a.z*1.1})
}

function zoomout(){
   let model = document.getElementById("model");
  let secModel = document.getElementById("secModel");

  let a = this.model.getAttribute('scale');
        this.model.setAttribute('scale',{x: a.x*0.9 ,y: a.y*0.9 ,z: a.z*0.9})
}


AFRAME.registerComponent('drag-rotate-component',{
      schema : { speed : {default:1}},
      init : function(){
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
        document.addEventListener('touchend',this.OnDocumentMouseUp.bind(this));
        document.addEventListener('touchmove',this.OnDocumentMouseMove.bind(this));
      },
      OnDocumentMouseDown : function(event){
        this.ifMouseDown = true;
        this.x_cord = event.touches[0].pageX;
        this.y_cord = event.touches[0].pageY;
      },
      OnDocumentMouseUp : function(){
        
        this.ifMouseDown = false;
        
      },
      OnDocumentMouseMove : function(event)
      {
        if(this.ifMouseDown)
        {
    
          var temp_x = event.touches[0].pageX-this.x_cord;
          var temp_y = event.touches[0].pageY-this.y_cord;
          if(Math.abs(temp_y)<Math.abs(temp_x))
          {
            this.el.object3D.rotateY(temp_x*this.data.speed/100);
      
          }
          else
          {
            this.el.object3D.rotateX(temp_y*this.data.speed/100);
          }
          this.x_cord = event.touches[0].pageX;
          this.y_cord = event.touches[0].pageY;
        }
      }
    });


AFRAME.registerComponent('resize',{
      schema : { speed : {default:1}},
      init : function(){
        document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
      },
      OnDocumentMouseDown : function(event){
        let a = this.el.getAttribute('scale');
        this.el.setAttribute('scale',{x: a.x*1.1 ,y: a.y*1.1 ,z: a.z*1.1});
      }
      
    });
