import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="126"
      height="50"
      fill="none"
      viewBox="0 0 126 50"
    >
      <path fill="url(#pattern0)" d="M76 0H126V50H76z"></path>
      <path fill="url(#pattern1)" d="M0 14H83V46H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.002)" xlinkHref="#image0_0_3"></use>
        </pattern>
        <pattern
          id="pattern1"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.002 0 0 .00526 0 -.86)"
            xlinkHref="#image1_0_3"
          ></use>
        </pattern>
        <image
          id="image0_0_3"
          width="500"
          height="500"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUQ2OUQ0NDFGQzUxMUVFQkRFQ0I2REQ4MjU2NDNCRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUQ2OUQ0NTFGQzUxMUVFQkRFQ0I2REQ4MjU2NDNCRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlBRDY5RDQyMUZDNTExRUVCREVDQjZERDgyNTY0M0JFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlBRDY5RDQzMUZDNTExRUVCREVDQjZERDgyNTY0M0JFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fSv4GQAAGtJJREFUeNrs3UFyG8d6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"
        ></image>
        <image
          id="image1_0_3"
          width="500"
          height="500"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNTU4QjgzQjFGQzUxMUVFOEFDMEM3OTI3RTI0RTY1RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNTU4QjgzQzFGQzUxMUVFOEFDMEM3OTI3RTI0RTY1RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE1NThCODM5MUZDNTExRUU4QUMwQzc5MjdFMjRFNjVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1NThCODNBMUZDNTExRUU4QUMwQzc5MjdFMjRFNjVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2wYK3gAAGapJREFUeNrs3Qv0buWc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"
        ></image>
      </defs>
    </svg>
  );
}

export default Icon;