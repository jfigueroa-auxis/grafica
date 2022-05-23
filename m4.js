var m4 = {

    perspective: function(fieldOfViewInRadians, aspect, near, far) {
      var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
      var rangeInv = 1.0 / (near - far);
  
      return [
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (near + far) * rangeInv, -1],
        [0, 0, near * far * rangeInv * 2, 0]
      ];
    },
  
    projection: function(width, height, depth) {
      // Note: This matrix flips the Y axis so 0 is at the top.
      return [
         [2 / width, 0, 0, 0],
         [0, -2 / height, 0, 0],
         [0, 0, 2 / depth, 0],
        [-1, 1, 0, 1],
      ];
    },
  
    //hace el producto punto entre 2 matrices 
    multiply: function(a,b) {
        return a.map(function(x,i) {
            return b.map(function(y,k) {
                return m4.dot(x, y) //dot hace el producto punto
            });
        });
    },
    
    dot: function(a,b) {
        return a.map(function(x,i) {
            return a[i] * b[i];
        }).reduce(function(m,n) { return m + n; });
    },

    vector: function(p1,p2){
      return p1.map(function(x,i) {
        return p1[i] + p2[i]
      })
    },

    crossProduct(v1,v2) {
      return [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v2[1] * v2[0]
      ]
    },
    
    transpose: function(a) {
        return a[0].map(function(x,i) {
            return a.map(function(y,k) {
                return y[i];
            })
        });
    },

    //define la matriz de traslacion
    translation: function(tx, ty, tz) {
      return [
         [1,  0,  0,  tx], 
         [0,  1,  0,  ty], 
         [0,  0,  1,  tz], 
         [0, 0, 0, 1], 
      ];
    },
  
    xRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
        [1, 0, 0, 0],
        [0, c, -s, 0],
        [0, s, c, 0],
        [0, 0, 0, 1],
      ];
    },
  
    yRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
        [c, 0, s, 0],
        [0, 1, 0, 0],
        [-s, 0, c, 0],
        [0, 0, 0, 1],
      ];
    },
  
    zRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
         [c, -s, 0, 0],
         [s, c, 0, 0],
         [0, 0, 1, 0],
         [0, 0, 0, 1],
      ];
    },
  
    scaling: function(sx, sy, sz) {
      return [
        [sx, 0,  0,  0],
        [0, sy,  0,  0],
        [0,  0, sz,  0],
        [0,  0,  0,  1],
      ];
    },
  
    //Funcion traslacion - m = matriz y vlrs a donde se va a trasladar
    translate: function(m, tx, ty, tz) {
      return m4.multiply(m, m4.translation(tx, ty, tz));//m 0 matriz a trasladar, matriz de taslacion
    },
  
    //Funcion de rotacion en X
    xRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.xRotation(angleInRadians));
    },
    
    //Funcion de rotacion en y
    yRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.yRotation(angleInRadians));
    },
  
    //Funcion de rotacion en z
    zRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.zRotation(angleInRadians));
    },
  
    //Funcion de scalar en z
    scale: function(m, sx, sy, sz) {
      return m4.multiply(m, m4.scaling(sx, sy, sz));
    }
  };