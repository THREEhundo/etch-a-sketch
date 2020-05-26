# Etch-a-Sketch
Part of the Odin Project Curriculum
A take on the classic Etch-a-Sketch toy.

## Functionality
* Passing through each square on the board changes the shade of the square from gray to black through the use of an event handler.
* It will take 10 passes for an individual square to turn black.
* Clicking the shake button will clear the board of the shaded squares.
* The range slider determines the length and width in amount of squares. Clicking new will both clear the board and refresh with the updated amount of squares.

## Process
Using a grid display allowed for an easy way to edit the amount of squares necessary. Most of the appearance and functionality was straightforward.

I ran into problems with darkening each square. I started with a global counter that was tied to each square which didn't allow each square to be darkened. I was able to pivot into giving every square an individual counter through datasets. This allowed for me to tie each dataset point with an increase in the alpha.

With the clearing of the board I wanted to add an animation. Just adding the animate class, it would only play the first click. I needed to find a way to toggle it on and off. I thought it would be straightforward by removing the class at the end of the function. This did not work because it was taken off before the animation finished. The workaround was to add an event listener to the end of the animation which removed itself and the animation class.
