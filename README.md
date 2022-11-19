# mav-slider

mav-slider is a package that provides a cool and customizable slider for your website.

## Installation

Use the CDN link to start using the package.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mav-slider@1.0.1/css/mav-slider.min.css">
<script src="https://cdn.jsdelivr.net/npm/mav-slider@1.0.1/mav-slider.min.js"></script>
```

Or use the package manager [npm](https://www.npmjs.com/package/mav-slider) to install the package.

```bash
npm install mav-slider
```

## Usage

### Basic Usage

```html
<div id="mavSlider">
     <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/img-1098x549-15.jpg" alt=""/>
     <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/img-1098x549-5.jpg" alt="" />
     <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/img-1098x549-1.jpg" alt=""/>
     <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/img-1098x549-10.jpg" alt=""/>
     <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/img-1098x549-4.jpg" alt=""/>
</div>
```

```javascript
import MavSlider from 'mav-slider';
import 'mav-slider/css/mav-slider.css';

#initialize the package
new MavSlider();
```
Result: <br>
![image](https://user-images.githubusercontent.com/81004830/202831165-b10db9e7-dcea-4a7b-be83-8cac4283cb78.png)

### Using Custom Configuration

```html
<div id="customContainer">
     <!-- Your Images -->
</div>
```

```javascript
$("#mavSlider").mavSlider({
    container: '#customContainer',
    dotSize: 3,
    offset: 1,
    slideHeight: "300px",
    slideWidth: "300px",
});
```
Result: <br>
![image](https://user-images.githubusercontent.com/81004830/202831189-8b4df263-9b79-4cd2-b31a-e6cc41b1512f.png)

### Using Ajax

```javascript
$("#mavSlider").mavSlider({
    ajax: {
        url: "https://picsum.photos/v2/list?page=2&limit=5",
        srcImgLocator: "download_url",
    },
});
```
Result: <br>
![image](https://user-images.githubusercontent.com/81004830/202831152-d4fdbc88-5770-4675-a002-cb4f171d6de7.png)

## Custom Configuration

| Property | Type | Default | Description | Example |
| --- | --- | --- | --- | --- |
| container | string | '#mavSlider' | Select the HTML element that is the container of your slider. | `container: '#customContainer'` |
| slideWidth | string | '400px' | Change the slide width. | `slideWidth: '300px'` |
| slideHeight | string | Equal to the width of the slide | Change the slide height. | `slideHeight: '250px'` |
| color | string | '#191919' | Change the color of buttons and indicators. | `color: '#0F3754'` |
| offset | number | 1 | The number of dots that will be shifted when the next/prev button is pressed. | `offset: 2` |
| dotSize | number | 4 | The number of dots displayed. | `dotSize: 5` |
| dotIndicator | boolean | true | To display the dot indicator. `You can change the style of the dot indicator by selecting the active dot attribute which is data-mavslider-dot-active in your CSS file.` | `dotIndicator: false` |
| skeleton | boolean | true | To display the loading skeleton. | `skeleton: false` |
| arrowPrev | string | `<svg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 24 24' width='16px'><path d='M0 0h24v24H0V0z' fill='none' opacity='.87' /><path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/></svg>` | To customize the previous button. | `arrowPrev: '&#171;'` |
| arrowNext | string | `<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='16px' viewBox='0 0 24 24' width='16px'><g><path d='M0,0h24v24H0V0z' fill='none' /></g><g><polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12'/></g></svg>` | To customize the next button. | `arrowNext: '&#187;'` |
| ajax | object | {} | To get data from an ajax request. `Details of the ajax property can be found in the table below`. | `ajax: { url 'https://picsum.photos/v2/list?page=2&limit=5', srcImgLocator: 'download_url' }` |

## Ajax Configuration

| Property | Type | Default | Description | Example |
| --- | --- | --- | --- | --- |
| url | string | - | URL from your API. `The response must be an array of objects` | `url: 'https://picsum.photos/v2/list?page=2&limit=5'` |
| srcImgLocator | string | - | The image property in the object from the response. | If the response from your API is like this `[ { download_url: 'https://picsum.photos/id/8/5000/3333' } ]` then the property will be `srcImgLocator: 'download_url'` |
| beforeSend | function | - | A function that is called before the ajax request is started | `beforeSend: function() { //Your Code }` |
| complete | function | - | A function that is called after the ajax request is completes, even though it is an error. | `complete: function() { //Your Code }` |
