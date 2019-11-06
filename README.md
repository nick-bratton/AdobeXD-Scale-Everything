# AdobeXD-Scale-Everything

## Summary

This plugin was intended to replicate Sketch's `Scale Layers` (Scale from center) in Adobe XD. 

## Installation

Follow the instructions on their [Plugin Developer Quick Start](https://adobexdplatform.com/plugin-docs/tutorials/quick-start/) page. 

## Development Notes

### What Is Possible

Running the plugin on an artboard will uniformly scale all Scene Nodes (so long as Responsive Resize is off for each) that are within the Edit Context. 

### What Is Not Possible

It is impossible with the current state of Adobe XD to edit nodes outside of the current [Edit Context](https://adobexdplatform.com/plugin-docs/reference/core/edit-context.html). This is sensible, but what makes it problematic for this use case is that is also impossible to programmatically override the Edit Context within the [plugin lifecycle](https://adobexdplatform.com/plugin-docs/reference/core/lifecycle.html3). Likewise, "You can only call editDocument() while handling a panel UI event which corresponds to an explicit user action (e.g. a "click" or "input" event)."

What the above means is that is not possible to perform operations on children of special container nodes such as Components ([SymbolInstances](https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#SymbolInstance)), [RepeatGrids](https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#RepeatGrid) or [BooleanGroups](https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#BooleanGroup). For example, for an artboard with `n` Components, each with `m` nested Components, the amount of operations `N` needed to scale every node on the artboard would be `n^m + 1` (to my first approximation). Not only that, but the user would have to manually (e.g., with their mouse) select each of these nodes and run the plugin on them one by one. 

Here are some links to posts on the [Adobe XD Plugin Developer Forum](https://forums.adobexdplatform.com) that are of interest:

* [A serious request for re-thinking the edit context vs plugins](https://forums.adobexdplatform.com/t/a-serious-request-for-re-thinking-the-edit-context-vs-plugins/1368/4)
* [Edit context rules for mask groups killing us](https://forums.adobexdplatform.com/t/edit-context-rules-for-mask-groups-killing-us/1360)
* [Edit context for RepeatGrid vs .pluginData](https://forums.adobexdplatform.com/t/edit-context-for-repeatgrid-vs-plugindata/1347)
* [Select (single) nodes outside the edit context programmatically](https://forums.adobexdplatform.com/t/select-single-nodes-outside-the-edit-context-programmatically/571/2)

and relevant, but less-so, links:


* [Disabling Responsive Resize by code](https://forums.adobexdplatform.com/t/disabling-responsive-resize-by-code/625)
* [System Call Access for UXP](https://forums.adobexdplatform.com/t/system-call-access-for-uxp/799)

And here is a link to the [XD Extensibility Roadmap](https://trello.com/b/WFKmCVaz/xd-extensibility-roadmap), which as of the time of this writing, makes no mention of the frequently inquired-about Edit Context extension.