var five = require('johnny-five'),
    board = new five.Board(),
    Oled = require('oled-js'),
    lastX=null,lastY=null,
    currentX=null,currentY=null,
    oled,potVertical, potHorizontal,clearButton;

board.on('ready',function(){
  //initialize the oled screen
  oled = new Oled(board,five, 
                    {
                      width:128,
                      height:64,
                      address:0x3D
                    }
                 );

  //initialize the y-axis potentiometer
  potVertical = new five.Sensor({
    pin: "A0",
    freq:250
  });

  //initialize the x-axis potentiometer
  potHorizontal = new five.Sensor({
    pin: "A1",
    freq:250
  });

  //initialize a button
  clearButton = new five.Button(2);

  //hook up the pot to update the movement on the y-axis
  potVertical.scale(0,oled.HEIGHT).on("change",function(){
    currentY = Math.round(this.value);

    oled.drawLine(lastX,lastY,currentX,currentY,1,true);
    lastX = currentX;
    lastY = currentY;
  });

  //hook up the pot to update the movement on the x-axis
  potHorizontal.scale(0,oled.WIDTH).on("change",function(){

    currentX = Math.round(this.value);

    //flip the value if your potiontiometer is hooked the other way around
    currentX = Math.abs(currentX - oled.WIDTH);

    oled.drawLine(lastX,lastY,currentX,currentY,1,true);
    lastX = currentX;
    lastY = currentY;
  });

  //initialize the cursor y-position
  potVertical.scale(0,oled.HEIGHT).on("data",function(){
    if(currentY === null){
      lastY = Math.round(this.value);
      currentY = lastY;
    }
  });

  //initialize the cursor x-position
  potHorizontal.scale(0,oled.WIDTH).on("data",function(){
    if(currentX === null){

      currentX = Math.round(this.value);
      //flip the value if your potiontiometer is hooked the other way around
      currentX = Math.abs(currentX - oled.WIDTH);
      lastX = currentX;
    }
  });

  //setup up the button to clear the display
  clearButton.on("down",function(){
    oled.clearDisplay();
  });

  //get the display ready
  oled.update();
  oled.dimDisplay(true);
  oled.clearDisplay();
});
