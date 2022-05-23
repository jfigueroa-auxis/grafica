//clase 1. Pintar un pixel
function draw_pixel(ctx, x, y){
    ctx.fillRect(x, y, 1, 1);
}

//clase 2. pintar lineas
function line(ctx, x0, y0, x1, y1){
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    while(true){
        draw_pixel(ctx, x0, y0);
        if((x0 === x1) && (y0 === y1)) break;
        var e2 = 2*err;
        if(e2 > -dy){ err -= dy; x0 += sx; }
        if(e2 < dy){ err += dx; y0 += sy; }
        
    }
}
    



      //calcula los vectores de vertices e indices
      function disc(segm){
        let v=[]; //vector de vertices 
        let ndx=[]; //vector de indices
        for(let i=0; i<segm; i++){
            v.push(Math.cos(2*Math.PI*i/segm)); //en el X coloco el cos
            v.push(Math.sin(2*Math.PI*i/segm)); //en el y coloco el sen
            v.push(0.0);//en z coloco 0
            //Esta calculando los indices
            ndx.push(segm); //
            ndx.push(i);
            ndx.push((i+1)%segm);
        }
        v.push(0); v.push(0); v.push(0);
        //console.log(v, ndx);
        return{v,ndx};
    }
