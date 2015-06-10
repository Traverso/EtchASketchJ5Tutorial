var five = require('johnny-five'),
    board = new five.Board(),
    Oled = require('oled-js');

board.on('ready',function(){

  //initialize the oled screen
  oled = new Oled(board,five, 
                    {
                      width:128,
                      height:64,
                      address:0x3D
                    }
                 );

  //get the display ready
  oled.clearDisplay();
  oled.drawRect(2,2,oled.WIDTH - 4, oled.HEIGHT - 4,1);


  var potHorizontal = new five.Sensor({
    pin: "A1",
    freq:250
  });

  var potVertical = new five.Sensor({
    pin: "A0",
    freq:250
  });

  potHorizontal.scale(0,oled.WIDTH).on("change",function(){
    var x = Math.round(this.value);
    console.log('Horizontal value:'+ x);
  });

  potVertical.scale(0,oled.HEIGHT).on("change",function(){
    var y = Math.round(this.value);
    console.log('Vertical value:'+ y);
  });


});
