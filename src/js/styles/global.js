// @flow

import { injectGlobal } from "styled-components";
import normalized from "./normalized";
import { orange, yellow, offwhite } from "./colors";

injectGlobal`
	${normalized}

	html {
		font-size: 10px;
		font-family: 'Acumin-Medium', helvetica, sans-serif;
		font-weight: 300;
		background-color: ${offwhite};
	}

	form {
		margin: 0;
	}

	button, input, select, option, textarea {
		background: white;
		font-family: 'Helvetica Neue', helvetica, sans-serif;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
	}

	button {
		cursor: pointer;
	}

	h1, h2, h3, h4, h5, h6, p, li, ol {
		font-weight: 300;
		margin: 0;
	}

	h1{
		font-family: "Bilbo";
		color: ${orange};
		font-size: 36px;
	}

	h2{
		font-weight: 800;
		color: ${orange}
		font-size: 28px;
		line-height: 40px;
	}

	h3{
		font-weight: 800;
		color: ${orange}
		font-size: 24px;
	}

	p{
		color: ${orange}
		font-size: 18px;
	}


	a {
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		&:hover{
			color: ${yellow};
			h1, h2, h3, h4, a{
				color: ${yellow};
			}
		}
	}

	h2{}

	* {
		box-sizing: border-box;
	}

	body {
		padding: 0;
	}

	#root,
	#reactRoot {
		height: 100%;
	}

	figure {
		margin 0;
	}

	img {
		max-width: 100%;
	}

	@font-face {
	  font-family: "Bilbo";
	  font-style: normal;
	  font-weight: 200;
	  src: url("/Static/fonts/BilboINC.ttf") format("truetype")}

	@font-face {
	  font-family: "Acumin-EL";
	  font-style: normal;
	  font-weight: 200;
	  src: url("/Static/fonts/AcuminPro-ExtraLight.otf") format("opentype")}

	@font-face {
	  font-family: "Acumin-Medium";
	  font-style: normal;
	  font-weight: 200;
	  src: url("/Static/fonts/AcuminPro-Medium.otf") format("opentype")}

`;
