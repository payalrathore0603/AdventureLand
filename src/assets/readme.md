**box-sizing: border-box**

```
     WHY WE NEED BOX-SIZING: BORDER-BOX
     =========================================================================

     THE PROBLEM (Default Browser Behavior - 'content-box'):
     If you DO NOT use 'box-sizing: border-box', the browser calculates size like this:
     Total Height = height (70px) + padding-top (10px) + padding-bottom (10px) + border (1px)
     Result = Your navbar accidentally becomes 91px tall instead of 70px!

     HOW IT REFLECTS IN YOUR APP:
     Because your navbar grew to 91px, your layout height calculation:
     `calc(100vh - var(--navbar-height))` (which expects exactly 70px) is now wrong.
     This causes your main screen area to overflow by 21px, creating an annoying,
     accidental vertical scrollbar on your page even if it's empty.

     THE SOLUTION ('box-sizing: border-box'):
     By adding this property, you tell the browser:
     "Keep the total height at exactly 70px. Force the padding and borders to
     shrink inward, inside that 70px limit."

     Result = Your layout calculation stays pixel-perfect, and your app fits
     the screen beautifully with no broken layout math or unwanted scrolling!
```
