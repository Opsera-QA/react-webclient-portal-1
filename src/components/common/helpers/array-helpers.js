// function to test if two objects or arrays are equal
// export function isEqual (value, other) {

// 	// Get the value type
// 	var type = Object.prototype.toString.call(value);

// 	// If the two objects are not the same type, return false
// 	if (type !== Object.prototype.toString.call(other)) return false;

// 	// If items are not an object or array, return false
// 	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

// 	// Compare the length of the length of the two items
// 	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
// 	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
// 	if (valueLen !== otherLen) return false;

// 	// Compare two items
// 	var compare = function (item1, item2) {

// 		// Get the object type
// 		var itemType = Object.prototype.toString.call(item1);

// 		// If an object or array, compare recursively
// 		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
// 			if (!isEqual(item1, item2)) return false;
// 		}

// 		// Otherwise, do a simple comparison
// 		else {

// 			// If the two items are not the same type, return false
// 			if (itemType !== Object.prototype.toString.call(item2)) return false;

// 			// Else if it's a function, convert to a string and compare
// 			// Otherwise, just compare
// 			if (itemType === '[object Function]') {
// 				if (item1.toString() !== item2.toString()) return false;
// 			} else {
// 				if (item1 !== item2) return false;
// 			}

// 		}
// 	};

// 	// Compare properties
// 	if (type === '[object Array]') {
// 		for (var i = 0; i < valueLen; i++) {
// 			if (compare(value[i], other[i]) === false) return false;
// 		}
// 	} else {
// 		for (var key in value) {
// 			if (value.hasOwnProperty(key)) {
// 				if (compare(value[key], other[key]) === false) return false;
// 			}
// 		}
// 	}

// 	// If nothing failed, return true
// 	return true;
// };

export function isEqual (arr1, arr2) {
  // check if params are array
  if(!(arr1 && arr2)){
    return false;
  }
  if(JSON.stringify(arr1.sort()) ===  JSON.stringify(arr2.sort())) {
    return true;
  } else {
    return false;
  }
}

export function isEquals (arr1, arr2) {
  // check if params are array
  if(!(arr1 && arr2)){
    return false;
  }
  let array1 = arr1.sort((a, b) => (a.committedFile > b.committedFile) ? 1 : (a.committedFile === b.committedFile) ? ((a.size > b.size) ? 1 : -1) : -1 );
  let array2 = arr2.sort((a, b) => (a.committedFile > b.committedFile) ? 1 : (a.committedFile === b.committedFile) ? ((a.size > b.size) ? 1 : -1) : -1 );
  if(JSON.stringify(array1) ===  JSON.stringify(array2)) {
    return true;
  } else {
    return false;
  }
}

// converting a csv text to array
export const CSVtoArray = (CSVstring) => {
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(CSVstring)) return null;

  var arr = []; // Initialize array to receive values.
  CSVstring.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {

          // Remove backslash from \' in single quoted values.
          if (m1 !== undefined) arr.push(m1.replace(/\\'/g, "'"));

          // Remove backslash from \" in double quoted values.
          else if (m2 !== undefined) arr.push(m2.replace(/\\"/g, '"'));
          else if (m3 !== undefined) arr.push(m3);
          return ''; // Return empty string.
      });

  // Handle special case of empty last value.
  if (/,\s*$/.test(CSVstring)) arr.push('');
  return arr;
};

// getting common values from both arrays
export const commonItems = (arr1, arr2) => {
  return arr1.filter(x => arr2.includes(x));
};
// getting diff values from both arrays
export const differentItems = (arr1, arr2) => {
  return arr1.filter(x => !arr2.includes(x));
};
// getting symmetric difference values from both arrays
export const symmetricDiff = (arr1, arr2) => {
  return arr1.filter(x => !arr2.includes(x))
             .concat(arr2.filter(x => !arr1.includes(x)));
};
// get a unique array obj based on a key
export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()];
};