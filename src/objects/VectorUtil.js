class VectorUtil {
    static getOrthogonalVector = (vect) => {
        return [-vect[1], vect[0]]
    }
      
    static getVectorLength = (vect) => {
        return Math.sqrt(
            Math.pow(vect[0], 2) + Math.pow(vect[1], 2)
        )
    }

    static multiplyVectors = (vect1, vect2) => {
        return [vect1[0] * vect2[0],
                vect1[1] * vect2[1]];
    }

    static normalizeVector = (vect) => {
        let length = VectorUtil.getVectorLength(vect);
        return [vect[0] / length,
                vect[1] / length]
    }
}