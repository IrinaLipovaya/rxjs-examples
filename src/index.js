import { fromEvent, zip } from 'rxjs';
import {
    mapTo,
    throttleTime,
    map,
    debounceTime,
    buffer,
    filter,
    takeUntil,
    mergeMap
} from 'rxjs/operators';

/* Notes:
   mapTo - map to a constant value only
   zip - combine values from different streams; emits as an array
   buffer - collect output values until provided observable emits to close "a window"; emits as an array
   takeUntil - emit values until provided observable emits
   mergeAll - collect and subscribe to all inner observables
   mergeMap = map + mergeAll (inner observables can be in parallel)
   switchMap - unsubscribe from a previous inner observable when another one emits
*/

const move = fromEvent(document, 'mousemove').pipe(
    throttleTime(300),
    mapTo('M')
);

const mouseDown = fromEvent(document, 'mousedown').pipe(
    mapTo('MD')
);

const mouseUp = fromEvent(document, 'mouseup').pipe(
    mapTo('MU')
);

const click = zip(mouseDown, mouseUp).pipe(
    mapTo('C')
);

const drag = mouseDown.pipe(
    mergeMap(md => move.pipe(
        mapTo('DR'),
        takeUntil(mouseUp)
    )),
);

const doubleClick = click.pipe(
    buffer(click.pipe(debounceTime(250))),
    map(clicks => clicks.length),
    filter(length => length > 1),
    mapTo('DC')
);

click.subscribe(console.log);
doubleClick.subscribe(console.log);
drag.subscribe(console.log);

