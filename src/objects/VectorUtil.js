class VectorUtil {
    static getOrthogonalVector = vect => {
        return [-vect[1], vect[0]]
    }
      
    static getVectorLength = vect => {
        return Math.sqrt(
            Math.pow(vect[0], 2) + Math.pow(vect[1], 2)
        )
    }
}