module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Date formatting filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    if (format === 'yyyy-MM-dd') {
      return d.toISOString().split('T')[0];
    }
    if (format === 'MMMM d, yyyy') {
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  // Limit filter
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Number formatting filter (2 decimal places with comma thousands separator)
  eleventyConfig.addFilter("number", function(value) {
    if (value === null || value === undefined) return "—";
    return parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });

  // Absolute value filter
  eleventyConfig.addFilter("abs", function(value) {
    if (value === null || value === undefined) return 0;
    return Math.abs(value);
  });

  // Truncate filter (if not built-in)
  eleventyConfig.addFilter("truncate", function(str, length) {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.substring(0, length) + "…";
  });

  // Articles collection
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.njk")
      .filter(item => !item.inputPath.includes("index.njk"))
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk"
  };
};
