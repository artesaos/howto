  // 1. Add the `prettyprint` class to `pre` tags. - When using Jekyll you *could* omit this step 
  // by using {% highlight prettyprint %} in your posts (which adds it to the `code` tags),
  // *BUT:* 
  //  - The method used here allows you to keep posts markdown-only (just indent for code-blocks), for portability
  //  - {$ highlight %} tags seem to break with Pygments disabled anyway (i.e. if you put a `#` within a code-block)
  //  - the container styling fix in the following step will not be as straightforward
  [].forEach.call(document.getElementsByTagName("pre"), function(el) {
    el.classList.add("prettyprint");
  });

  // 2. Run
  prettyPrint();
