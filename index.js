/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    // creata a global result 
    const result = [];
    
    // create a recursive case -> dfs recursive helper
    // pass an i variable and the nums array, we're gonna use the input array and swap the numbers
    const dfs = (i, nums) => {
        // base case
        // if we are at the leaf level, make a copy of whatever is in nums array
        // and push into global result
        if(i === nums.length) {
            result.push(nums.slice());
            return;
        }
        // else -> dfs recursive case
        // we have to swap between i and j, using a for loop
        // 1) swap i & j -> 2) increment j -> 3) send the result permutation down the tree
        // 4) then we reswap, as we go back up the tree (backtrack), as j increments
        for(let j = i; j < nums.length; j++) {
            // swapping the variables
            [nums[i], nums[j]] = [nums[j], nums[i]]; 
            // make a recursive call using dfs helper, incrementing i and then calling it nums
            dfs(i + 1, nums);
            // reswap i and j 
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
        // call dfs, pass in i and nums
        dfs(0, nums); 
        // return result 
        return result;

    };

/* 
    Algorithm:  
    This problem uses backtracking, a recursion method. Think of recursion as a tree. (this is in-order DFS traversal) 
    
    nums = [1, 2, 3]            1                           2                                      3  <-- Level 1 of tree   
                                |                           |                                
                            1, 2,  3                     2, 1, 2                   3, 1, 2            <-- Level 2 of tree
                         /     \                        /       \               /           \   
                   1, 2, 3     1, 3, 2              2, 1, 3    2, 3, 1      3, 1, 2        3, 2, 1    <-- Level 3 of tree (Leaf-level)

  
  RESULT = [[1, 2, 3]]    Time complexity: O(N! x N) : S                nums = [1, 2, 3]
                                            3 x 2 x 1 x 3                          ^  ^
                                          O(N! x N): T                             |  |
                                                                               use i, j as increment pointers to swap between 2 with 1, and 3 with 1 to reach level 1
                                          
Reason: The runtime is N factorial times N because as we go down every level, the number of items in the tree grows as a factorial. 
Once we hit the bottom we have to push the total number of items into the end result, which is going to be N.

Space complexity: O(N! X N) : S

    Reason: We're going to have create this result tree (which is factorial), 
    and then we're going to have to consider the height of the tree, which is O(N)

*/