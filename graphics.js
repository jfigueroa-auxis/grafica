        function degToRad(d) {
            return d * Math.PI / 180;
        }

        function normalizar(point){
            let x = point[0];
            let y = point[1];
            let z = point[2];

            var m = Math.sqrt(x*x + y*y + z*z);
            return [ x/m,  y/m,  z/m ]
        }

        function algoritmo_bresenham(x0, y0, x1, y1, callback){
            var dx = Math.abs(x1 - x0);
            var dy = Math.abs(y1 - y0);
            var sx = (x0 < x1) ? 1 : -1;
            var sy = (y0 < y1) ? 1 : -1;
            var err = dx - dy;

            while(true){
                callback(x0, y0);
                if((x0 === x1) && (y0 === y1)) break;
                var e2 = 2*err;
                if(e2 > -dy){ err -= dy; x0 += sx; }
                if(e2 < dy){ err += dx; y0 += sy; }       
            }
        }

        function cono(segm){
            let v=[];
            let ndx =[];
            for(let i=0; i<segm; i++){
                v.push(Math.cos(2*Math.PI*i/segm));
                v.push(1.0);
                v.push(Math.sin(2*Math.PI*i/segm));
                ndx.push(segm);
                ndx.push(i);
                ndx.push((i+1)%segm);
                ndx.push(segm+1);
                ndx.push(i);
                ndx.push((i+1)%segm);
            }
            v.push(0.0); v.push(1.0); v.push(0.0);
            v.push(0.0); v.push(-1.0); v.push(0.0);
            return{v, ndx};
        }

        function cubo() {
            // segm
            let  ancho = 1, alto = 1, profundida = 1, segmHorizontales = 1, segmVerticales = 1, segmEnZ_profundida = 1;

            segmHorizontales = Math.floor( segmHorizontales );
            segmVerticales = Math.floor( segmVerticales );
            segmEnZ_profundida = Math.floor( segmEnZ_profundida );

            const indices = [];
            const vertices = [];

            let cantDeVertices = 0;
           
            //crea 6 planos
            generar_plano( 'z', 'y', 'x', - 1, - 1, profundida, alto, ancho, segmEnZ_profundida, segmVerticales, 0 ); // cara laterales
            generar_plano( 'z', 'y', 'x', 1, - 1, profundida, alto, - ancho, segmEnZ_profundida, segmVerticales, 1 ); // cara lateral
            generar_plano( 'x', 'z', 'y', 1, 1, ancho, profundida, alto, segmHorizontales, segmEnZ_profundida, 2 ); // acostada
            generar_plano( 'x', 'z', 'y', 1, - 1, ancho, profundida, - alto, segmHorizontales, segmEnZ_profundida, 3 ); // acostada
            generar_plano( 'x', 'y', 'z', 1, - 1, ancho, alto, profundida, segmHorizontales, segmVerticales, 4 ); // cara de frontal y posterior    ****
            generar_plano( 'x', 'y', 'z', - 1, - 1, ancho, alto, - profundida, segmHorizontales, segmVerticales, 5 ); // cara de frontal y posterior

            function generar_plano( u, v, w, udir, vdir, anchoCara, altoCara, profunCara, gridX, gridY) {

                const segmHorizontales = anchoCara / gridX;
                const segmVerticales = altoCara / gridY;

                const mitadHorizontal = anchoCara / 2;
                const mitadVertical = altoCara / 2;
                const mitadProfundidad = profunCara / 2;

                const gridX1 = gridX + 1;
                const gridY1 = gridY + 1;

                let contVertices = 0;
                let conteoDeGrupo = 0;

                const vector = {};

                //vertices de 1 cara
                for ( let iy = 0; iy < gridY1; iy ++ ) {
                    const y = iy * segmVerticales - mitadVertical;
                    for ( let ix = 0; ix < gridX1; ix ++ ) {
                        const x = ix * segmHorizontales - mitadHorizontal;

                        vector[ u ] = x * udir;
                        vector[ v ] = y * vdir;
                        vector[ w ] = mitadProfundidad;

                        vertices.push( vector.x, vector.y, vector.z );
                       
                        vector[ u ] = 0;
                        vector[ v ] = 0;
                        vector[ w ] = profunCara > 0 ? 1 : - 1;

                        contVertices += 1;
                    }
                }

                //indices de esa cara
                for ( let iy = 0; iy < gridY; iy ++ ) {
                    for ( let ix = 0; ix < gridX; ix ++ ) {
                        const a = cantDeVertices + ix + gridX1 * iy;
                        const b = cantDeVertices + ix + gridX1 * ( iy + 1 );
                        const c = cantDeVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
                        const d = cantDeVertices + ( ix + 1 ) + gridX1 * iy;

                        indices.push( a, b, d );
                        indices.push( b, c, d );

                        conteoDeGrupo += 6;
                    }
                }

                //groupStart += groupCount;

                cantDeVertices += contVertices;
            }

        return { ndx:indices, v:vertices }
        }

        function malla_disco (segments) {

			let radius = 1,  thetaStart = 0, thetaLength = Math.PI * 2
			segments = Math.max(3, segments);

			const indices = [];
			const vertices = [];

			vertices.push(0, 0, 0);

			for (let s = 0, i = 3; s <= segments; s++, i += 3) {
				const segment = thetaStart + s / segments * thetaLength; 
                let vertex = {
                    x: radius * Math.cos(segment),
                    y: radius * Math.sin(segment),
                    z: 0
                }
				vertices.push(vertex.x, vertex.y, vertex.z); 
			} 

			for (let i = 1; i <= segments; i++) {
				indices.push(i, i + 1, 0);
			}
            return {ndx:indices, v:vertices };
		}
       
        function plano(segments = 1){
            let segmHorizontales = segmVerticales = segments //pa q sea un cuadrado ancho y alto es igual que lo llegue por segmentos
            let ancho = 1;//ancho del segmento
            let alto = 1;
        
            const mitadAncho = ancho / 2;
            const mitadAlto = alto / 2;
        
            const gridX = Math.floor( segmHorizontales ); //aprox entero mas cercano menor
            const gridY = Math.floor( segmVerticales ); //aprox entero mas cercano menor
        
            const gridX1 = gridX + 1; 
            const gridY1 = gridY + 1;
        
            const anchoSegmento = ancho / gridX; //ancho del segmento 
            const altoSegmento = alto / gridY; //alto del segmento

            const indices = [];
            const vertices = [];
        
            for ( let iy = 0; iy < gridY1; iy ++ ) {
                const y = iy * altoSegmento - mitadAlto; //ubica el plano en el centro del plano cartesiano
                for ( let ix = 0; ix < gridX1; ix ++ ) {
                    const x = ix * anchoSegmento - mitadAncho;
                    vertices.push( x, - y, 0 );
                }
            }
        
            for ( let iy = 0; iy < gridY; iy ++ ) {
                for ( let ix = 0; ix < gridX; ix ++ ) {
                    const a = ix + gridX1 * iy;
                    const b = ix + gridX1 * ( iy + 1 );
                    const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
                    const d = ( ix + 1 ) + gridX1 * iy;
                    indices.push( a, b, d );
                    indices.push( b, c, d );
                }
            }
            return{ ndx:indices, v:vertices }
        }
        
        function esfera(longitud = 32, latitud = 16) {

            let radio = 1, inicioPI = 0, longitudPI = Math.PI * 2, inicioTeta = 0, longTeta = Math.PI

            longitud = Math.max( 3, Math.floor( longitud ) ); //minimo longitud 3 si el valor de entrada es menor
            latitud = Math.max( 2, Math.floor( latitud ) ); //minimo latitud 2 si el valor de entrada es menor

            const tetaFinal = Math.min( inicioTeta + longTeta, Math.PI );//teta_final -> 

            let index = 0;
            const grid = [];
            const vertice = {};

            // buffers

            const indices = [];
            const vertices = [];

            for ( let iy = 0; iy <= latitud; iy ++ ) {

                const verticesRow = [];

                const v = iy / latitud;

                for ( let ix = 0; ix <= longitud; ix ++ ) {

                    const u = ix / longitud;

                    // vertex

                    vertice.x = - radio * Math.cos( inicioPI + u * longitudPI ) * Math.sin( inicioTeta + v * longTeta );
                    vertice.y = radio * Math.cos( inicioTeta + v * longTeta );
                    vertice.z = radio * Math.sin( inicioPI + u * longitudPI ) * Math.sin( inicioTeta + v * longTeta );

                    vertices.push( vertice.x, vertice.y, vertice.z );

                    verticesRow.push( index ++ );
                }

                grid.push( verticesRow );

            }

            // indices

            for ( let iy = 0; iy < latitud; iy ++ ) {
                for ( let ix = 0; ix < longitud; ix ++ ) {
                    const a = grid[ iy ][ ix + 1 ];
                    const b = grid[ iy ][ ix ];
                    const c = grid[ iy + 1 ][ ix ];
                    const d = grid[ iy + 1 ][ ix + 1 ];

                    if ( iy !== 0 || inicioTeta > 0 ) indices.push( a, b, d );
                    if ( iy !== latitud - 1 || tetaFinal < Math.PI ) indices.push( b, c, d );
                }
            }

            return { ndx: indices, v: vertices }
        }
