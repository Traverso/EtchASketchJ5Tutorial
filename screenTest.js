var five = require('johnny-five'),
    board = new five.Board(),
    Oled = require('oled-js');

board.on('ready',function(){
  var oled = new Oled(board,five, 
                    {
                      width:128,
                      height:64,
                      address:0x3D
                    }
                 );

  oled.clearDisplay();
  oled.drawRect(2,2,oled.WIDTH - 4, oled.HEIGHT - 4,1);
});
