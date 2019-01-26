import {slice} from "./array";

export var implicit = {name: "implicit"};

export default function ordinal(domain, range) {
  var index,
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  switch (arguments.length) {
    case 0: range = [], domain = [], index = new Map; break;
    case 1: range = slice.call(domain), domain = [], index = new Map; break;
    default: range = slice.call(range), scale.domain(domain); break;
  }

  return scale;
}
