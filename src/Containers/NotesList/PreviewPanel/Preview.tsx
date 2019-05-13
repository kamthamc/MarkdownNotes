import * as React from 'react';
import { Note } from "../typings";
import { getMarkdownHTML } from '../../../Helpers/Markdown';
import styled from 'styled-components';

interface Props {
    note: Note
}

const PreviewPanelContainer = styled('div')`
    padding: 10px;
    min-height: 300px;

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 3.25rem;
}

h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: 300;
    font-size: 2.5rem;
}

h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
    font-size: 2rem;
}

h4 {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
    font-size: 1.5rem;
}

h5 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1.25rem;
}

h6 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1rem;
}

p {
    margin-top: 0;
    margin-bottom: 1rem;
}

a {
    background-image: linear-gradient(#449, #449);
    background-size: 0.06em 0.06em;
    background-repeat: repeat-x;
    background-position-y: 93%;
    background-position-x: 0;
    color: #449;
    text-decoration: none;
    /* text-shadow: white 0.7px 0.7px 0.1px, white 0 1px 0.1px, white -.7px 0.7px 0.1px, white -.7px 0 0.1px, white -.7px -.7px 0.1px, white 0 -.7px 0.1px, white 0.7px -.7px 0.1px, white 0.7px 0 0.1px; */
    transition: 0.15s;
}

a:active {
    background-color: #eee;
    color: #555;
    text-decoration: none;
    /* text-shadow: #eee 0.7px 0.7px 0.1px, #eee 0 1px 0.1px, #eee -.7px 0.7px 0.1px, #eee -.7px 0 0.1px, #eee -.7px -.7px 0.1px, #eee 0 -.7px 0.1px, #eee 0.7px -.7px 0.1px, #eee 0.7px 0 0.1px; */
}

a:hover {
    background-image: linear-gradient(#66e, #66e);
    color: #66e;
}

b,
strong {
    font-weight: bolder;
}

em,
i {
    font-style: italic;
}

del,
s,
strike {
    text-decoration: none;
    background-image: linear-gradient(#000, #000);
    background-size: 0.06em 0.06em;
    background-repeat: repeat-x;
    background-position-y: 65%;
    background-position-x: 0;
}

code,
pre,
samp,
var {
    font-size: 95%;
    font-family: "Roboto Mono", monospace;
    font-weight: 300;
    color: #666;
}

pre {
    display: block;
    margin: 1rem -2rem;
    padding: 1rem 2rem;
    background-color: #eee;
    border-left: 0.1rem solid #888;
}

p code {
    padding: 0 0.2em 0.1em;
    background-color: #eee;
}

p var {
    padding: 0 0.2em 0.1em;
    background-color: #eee;
    font-weight: bolder;
    font-style: normal;
}

p samp {
  padding: 0 0.2em 0.1em;
  margin: 0 0.1em;
  background-color: #666;
  color: #eee;
}

kbd {
  position: relative;
  padding: 0.2em 0.2em 0.1em 0.2em;
  margin: 0 0.1em;
  bottom: 0.125em;
  font-family: "Fira Sans", "Verdana", "Geneva", sans-serif;
  font-size: 0.8em;
  background-color: #eee;
  border-radius: 0.2em;
  border-bottom: 0.05em solid #aaa;
}

blockquote {
    margin: 1rem -2rem;
    padding: 1rem 2rem;
    background-color: #eee;
    color: #666;
    font-size: 1.2rem;
    font-style: italic;
    line-height: 1.5;
}

blockquote::before {
    content: "\\201C";
    display: block;
    position: relative;
    height: 0;
    left: -1.3rem;
    top: -0.5rem;
    font-size: 2em;
    color: #888;
}

blockquote::after {
    content: "\\201D";
    display: inline-block;
    position: relative;
    height: 0;
    top: 1.6rem;
    left: 0.2rem;
    font-size: 2em;
    line-height: 0;
    color: #888;
}

abbr[title] {
    text-decoration: none;
    background-image: linear-gradient(90deg, gray 50%, transparent 50%);
    background-size: 0.1em 0.06em;
    background-repeat: repeat-x;
    background-position-y: 100%;
    background-position-x: 0;
    font-feature-settings: "smcp";
}

ul {
    list-style: none;
    margin-left: -2em;
    padding-left: 2em;
}

ul > li {
    padding-left: 0;
}

ul > li::before {
    content: "»";
    display: block;
    position: relative;
    height: 0;
    width: 2em;
    margin-left: -2.5em;
    font-weight: bolder;
    color: #888;
    text-align: right;
}

ul ul > li::before {
    content: "›";
    display: block;
    position: relative;
    height: 0;
    width: 2em;
    margin-left: -2.5em;
    font-weight: bolder;
    color: #888;
    text-align: right;
}

ol {
    list-style: none;
    margin-left: -2em;
    padding-left: 2em;
}

ol > li {
    padding-left: 0;
    counter-increment: ol-count;
}

ol > li:first-child {
    counter-reset: ol-count;
}

ol > li::before {
    content: counter(ol-count)".";
    display: block;
    position: relative;
    height: 0;
    width: 2em;
    margin-left: -2.5em;
    font-weight: bolder;
    color: #888;
    text-align: right;
}

ol ol,
ol ul,
ul ol,
ul ul {
    margin: 0.5em 0;
}

img {
    display: block;
    width: calc(100% + 4rem);
    margin: 1rem -2rem;
}

figure {
    display: inline-table;
    margin: 0rem -2rem 1rem -2rem;
    padding: 2rem 2rem;
    background-color: #eee;
}

figure img {
    display: inline-block;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
}

figure img + img {
  margin-left: 1rem;
}

figure figcaption {
    max-width: 100%;
    margin: 1rem auto -1rem auto;
    font-size: 0.9rem;
    font-style: italic;
}

table {
    margin: 0 -1rem 1rem -1rem;
    width: calc(100% + 2rem);
    overflow: hidden;
    border-collapse: collapse;
}

table caption {
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
  caption-side: bottom;
  text-align: center;
  font-style: italic;
  color: #666;
}

tr {
    transition: 0.15s;
}

thead tr {
    border-bottom: 2px solid #888;
}

tfoot tr {
    border-bottom: none;
    border-top: 1px solid #eee;
    font-weight: bolder;
}

tbody tr:hover,
tfoot tr:hover {
    background-color: #eee;
}

td, th {
    position: relative;
    padding: 0.3rem 1rem;
}

th {
    font-weight: bolder;
}

tbody tr:first-of-type td,
tbody tr:first-of-type th {
    padding-top: 0.5rem;
}

hr {
    height: 0;
    width: 10rem;
    border: 0;
    border-bottom: 1px solid rgba(0,0,0,1);
    margin: 2rem auto;
}


`;


const PreviewPanel = (props: Props) => {
    return (
        <PreviewPanelContainer dangerouslySetInnerHTML={{ __html: getMarkdownHTML(props.note.content) }} />
    );
};

export default PreviewPanel;
