function minimumDistances(a) {
    const diffLength = []
    for(let i=0; i< a.length; i++) {
        for(let j=i+1; j< a.length; j++) {
            if(a[i] === a[j]) {
                diffLength.push(j-i);
            }
        }
    }
    diffLength.sort()

    return diffLength.length ? diffLength[0] : -1
}

console.log(minimumDistances([1,2,2,3,1]))