function handleHightlightContent(content) {
    return content.split(/(?=[@# ])/);
}

export default handleHightlightContent;
