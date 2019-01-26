// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/casacodigo$1.0.0/src/app/views/livros/auth/login.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<form action=\"/login\" method=\"post\"><div><label>E-mail:</label><input type=\"text\" name=\"email\"></div><div><label>Senha:</label><input type=\"password\" name=\"senha\"></div><div><input type=\"submit\" value=\"Log In\"></div></form>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/casacodigo$1.0.0/src/app/views/livros/auth/login.marko"
  };
