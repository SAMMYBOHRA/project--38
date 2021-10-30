class feed{
    constructor(){
          
    }
    display(){
      var button = createButton("FEED THE DOG");
      button.position(400,125);

      if(button.mousePressed(function(){
         foodS=foodS-1;
         //foodS-=1;
         gameState=1;
         database.ref('/').update({
           'gameState':gameState
         });
      }))

      var addFood= createButton("ADD FOOD");
      addFood.position(500,125);

      if(addFood.mousePressed(function(){
          foodS = foodS+1;
          gameState=2;
          database.ref('/').update({'gameState': gameState});
      }));
    }
}