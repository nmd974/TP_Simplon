var array1 = [4,8,7,9,1,5,4,6];
var array2 = [7,6,5,2,1,3,7,4];
var arrayTrie = [2,6,3,8,9,1,7,4,5];
var arrayRendu = [];  
var listItem = document.createElement('tr');

$(document).ready(function loading(params) {
    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i];
        const element2 = array2[i];
        arrayRendu.push(element1 + element2);  
    }

    arrayRendu.forEach(element => {
        var divToAdd = document.createElement('th');
        divToAdd.innerHTML = element;
        console.log(divToAdd);
        listItem.appendChild(divToAdd);
        
    });

    $('#container').append(listItem);
})

$(document).ready(function trie() {
    
    const mergeSort = array => {
        // divide array until there's only one element
        // the recursive stop condition !
        if (array.length > 1) {
          // get the middle index of the current division
          const middleIndex = Math.floor(array.length / 2)
          // get left side
          const leftSide = array.slice(0, middleIndex)
          // get right side
          const rightSide = array.slice(middleIndex)
          // call recursively for the left part of the data
          mergeSort(leftSide)
          // call recursively for the right part of the data
          mergeSort(rightSide)
          // default setup of the indexes
          let leftIndex = 0, rightIndex = 0, globalIndex = 0
          // loop until we reach the end of the left or the right array
          // we can't compare if there is only one element
          while(leftIndex < leftSide.length && rightIndex < rightSide.length) {
            // actual sort comparaison is here
            // if the left element is smaller its should be first in the array
            // else the right element should be first
            // move indexes at each steps
            if (leftSide[leftIndex] < rightSide[rightIndex]) {
              array[globalIndex] = leftSide[leftIndex]
              leftIndex++
            } else {
              array[globalIndex] = rightSide[rightIndex]
              rightIndex++
            }
            globalIndex++
          }
          // making sure that any element was not left behind during the process
          while(leftIndex < leftSide.length) {
            array[globalIndex] = leftSide[leftIndex]
            leftIndex++
            globalIndex++
          }
          while(rightIndex < rightSide.length) {
            array[globalIndex] = rightSide[rightIndex]
            rightIndex++
            globalIndex++
          }
        }
        return array
      }
      console.log(mergeSort([2,6,3,8,9,9,10,1,7,4,5]))
})

