//element ids
const elements = {
    display:"display",
    virusBtn:"virus",
    cureBtn:"cure"
};
//siren head state
const state = {
    alive:true
}
let virusBtn;
let cureBtn;
//resource labels and paths
const resources = [
        {label:"map",path:"resources/map.jpg"},
        {label:"siren",path:"resources/siren.png"},
        {label:"sirenDead",path:"resources/siren-dead.png"}
    ];
//siren head map locations
const sirenHeads = [
        {label:"sirenNA", coords:{x:300,y:200}},
        {label:"sirenSA",coords:{x:450,y:400}},
        {label:"sirenAfrica",coords:{x:760,y:350}},
        {label:"sirenEU",coords:{x:800,y:150}},
        {label:"sirenAsia",coords:{x:1075,y:240}},
        {label:"sirenAU",coords:{x:1200,y:430}}
    ]
//sprite cache
const sprites = {};
//get display dimensions
const width = window.innerWidth * .99;
const height = window.innerHeight *.97;
//get display container
const display = document.getElementById(elements.display);
//create app
const app = new PIXI.Application({width:width,height:height});
//start application
run().catch((e)=>{console.log(e);});

async function run(){
    queueResources();
    //display view
    display.appendChild(app.view);
    //load resources
    await app.loader.load((loader,resources)=>{
        //store map sprite
        sprites.map = new PIXI.Sprite(resources.map.texture);
        sprites.map.x = 0;
        sprites.map.y = 0;
        sprites.map.width = width;
        sprites.map.height = height;
        addSirenHead(resources.siren.texture,resources.sirenDead.texture);
        addButtonEvents();
        //render view
        app.renderer.render(app.stage);
    });
}
function addSirenHead(aliveTexture,deadTexture){
    app.stage.addChild(sprites.map);
    let sirenHead;
    for(let i = 0; i < sirenHeads.length; i++){
        sirenHead = sirenHeads[i];
        sprites[sirenHead.label] = new PIXI.Sprite(aliveTexture);
        sprites[sirenHead.label].x = sirenHead.coords.x;
        sprites[sirenHead.label].y = sirenHead.coords.y;
        app.stage.addChild(sprites[sirenHead.label]);

        sprites[sirenHead.label+"Dead"] = new PIXI.Sprite(deadTexture);
        sprites[sirenHead.label+"Dead"].x = sirenHead.coords.x;
        sprites[sirenHead.label+"Dead"].y = sirenHead.coords.y;
    }

}
function addButtonEvents(){
    virusBtn = document.getElementById(elements.virusBtn);
    cureBtn = document.getElementById(elements.cureBtn);
    virusBtn.addEventListener("click",loadVirus);
    cureBtn.addEventListener("click",loadCure);
}
function loadVirus(){
    if(state.alive){
        let sirenHead;
        const stage = new PIXI.Container();
        stage.addChild(sprites.map);
        for(let i = 0; i < sirenHeads.length; i++){
            sirenHead = sirenHeads[i];
            stage.addChild(sprites[sirenHead.label+"Dead"]);
        }
        app.stage = stage;
        app.renderer.render(stage)
        state.alive = false;
    }
}
function loadCure(){
    if(!state.alive){
        let sirenHead;
        const stage = new PIXI.Container();
        stage.addChild(sprites.map);
        for(let i = 0; i < sirenHeads.length; i++){
            sirenHead = sirenHeads[i];
            stage.addChild(sprites[sirenHead.label]);
        }
        app.stage = stage;
        app.renderer.render(stage)
        state.alive = true;
    }
}
function queueResources(){
    for(let i = 0; i < resources.length; i++){
        app.loader.add(resources[i].label,resources[i].path);
    }
}