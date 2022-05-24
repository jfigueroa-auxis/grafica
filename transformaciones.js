
        //objeto y donde se va a trasladar
        function trasladar(primitiva, x, y, z){

            let vec = vectorizar(primitiva);  
            let t = m4.translate(vec, x,y,z) //hace la traslacion con la matriz que retorno normalizar, t = matriz trasladada 
            let matriz = desvectorizar(t); //deja la matriz en un solo vector de vertices... para poder pintar 

            primitiva.v = matriz; //actuliza el arreglo de vertices 

            return primitiva;
        }

        function escalar(primitiva,x,y,z){
            let vec = vectorizar(primitiva);  
            let t = m4.scale(vec, x,y,z) 
            let matriz = desvectorizar(t); 

            primitiva.v = matriz; 

            return primitiva;
        }

        function rotar(primitiva,x,y,z){
            let vect = vectorizar(primitiva);  
            
            let t = m4.xRotate(vect, degToRad(x)) 
            t = m4.yRotate(t, degToRad(y))
            t = m4.zRotate(t, degToRad(z))

            let mat = desvectorizar(t); 

            primitiva.v = mat; 

            return primitiva;
        }

        /// [[...],[...]] convertir en una matriz homogenea  x y z, y el factor h. recorre el arr de vertices y cda 3 posiciones extrae el vector
        function vectorizar(primitiva){
            let vertices = primitiva.v;
            let len = vertices.length / 3;
            let matriz = [];

            for (let i = 0; i < len; i++) {
                let e = [ vertices[i*3], vertices[i*3+1], vertices[i*3+2], 1 ];
                matriz.push(e);
            }

            return matriz;
        }

        ///[...]
        function desvectorizar(matriz){
            let primitiva = [];

            for (let i = 0; i < matriz.length; i++) {
                let par = matriz[i];

                primitiva.push(par[0])
                primitiva.push(par[1] )
                primitiva.push(par[2] )
            }
            return primitiva;
        }
