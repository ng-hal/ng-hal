// This implementation of URI Templates is a TypeScript adoption of 'uri-templates'
// @see https://github.com/geraintluff/uri-templates/blob/master/uri-templates.js


interface StringBooleanMapping {
  [key: string]: boolean
}

const uriTemplateGlobalModifiers: StringBooleanMapping = {
  "+": true,
  "#": true,
  ".": true,
  "/": true,
  ";": true,
  "?": true,
  "&": true
};

const uriTemplateSuffices: StringBooleanMapping = {
  "*": true
};

function notReallyPercentEncode(string: string) {
  return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
    return "%" + doubleEncoded.substring(3);
  });
}

function uriTemplateSubstitution(spec: string) {
  var modifier = "";
  if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
    modifier = spec.charAt(0);
    spec = spec.substring(1);
  }
  var separator = "";
  var prefix = "";
  var shouldEscape = true;
  var showVariables = false;
  var trimEmptyString = false;
  if (modifier == '+') {
    shouldEscape = false;
  } else if (modifier == ".") {
    prefix = ".";
    separator = ".";
  } else if (modifier == "/") {
    prefix = "/";
    separator = "/";
  } else if (modifier == '#') {
    prefix = "#";
    shouldEscape = false;
  } else if (modifier == ';') {
    prefix = ";";
    separator = ";",
      showVariables = true;
    trimEmptyString = true;
  } else if (modifier == '?') {
    prefix = "?";
    separator = "&",
      showVariables = true;
  } else if (modifier == '&') {
    prefix = "&";
    separator = "&",
      showVariables = true;
  }

  var varNames = [];
  var varList = spec.split(",");
  var varSpecs: any[] = [];
  var varSpecMap: { [key: string]: any } = {};
  for (var i = 0; i < varList.length; i++) {
    var varName = varList[i];
    var truncate = null;
    if (varName.indexOf(":") != -1) {
      var parts = varName.split(":");
      varName = parts[0];
      truncate = parseInt(parts[1]);
    }
    var suffices: StringBooleanMapping = {};
    while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
      suffices[varName.charAt(varName.length - 1)] = true;
      varName = varName.substring(0, varName.length - 1);
    }
    var varSpec = {
      truncate: truncate,
      name: varName,
      suffices: suffices
    };
    varSpecs.push(varSpec);
    varSpecMap[varName] = varSpec;
    varNames.push(varName);
  }
  var subFunction: Function & { varNames?: string[] } = function (valueFunction: Function) {
    var result = "";
    var startIndex = 0;
    for (var i = 0; i < varSpecs.length; i++) {
      var varSpec = varSpecs[i];
      var value = valueFunction(varSpec.name);
      if (value == null || (Array.isArray(value) && value.length == 0) || (typeof value == 'object' && Object.keys(value).length == 0)) {
        startIndex++;
        continue;
      }
      if (i == startIndex) {
        result += prefix;
      } else {
        result += (separator || ",");
      }
      if (Array.isArray(value)) {
        if (showVariables) {
          result += varSpec.name + "=";
        }
        for (var j = 0; j < value.length; j++) {
          if (j > 0) {
            result += varSpec.suffices['*'] ? (separator || ",") : ",";
            if (varSpec.suffices['*'] && showVariables) {
              result += varSpec.name + "=";
            }
          }
          result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
        }
      } else if (typeof value == "object") {
        if (showVariables && !varSpec.suffices['*']) {
          result += varSpec.name + "=";
        }
        var first = true;
        for (var key in value) {
          if (!first) {
            result += varSpec.suffices['*'] ? (separator || ",") : ",";
          }
          first = false;
          result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
          result += varSpec.suffices['*'] ? '=' : ",";
          result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
        }
      } else {
        if (showVariables) {
          result += varSpec.name;
          if (!trimEmptyString || value != "") {
            result += "=";
          }
        }
        if (varSpec.truncate != null) {
          value = value.substring(0, varSpec.truncate);
        }
        result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21") : notReallyPercentEncode(value);
      }
    }
    return result;
  };
  var guessFunction = function (stringValue: any, resultObj: any): any {
    if (prefix) {
      if (stringValue.substring(0, prefix.length) == prefix) {
        stringValue = stringValue.substring(prefix.length);
      } else {
        return null;
      }
    }
    if (varSpecs.length == 1 && varSpecs[0].suffices['*']) {
      var varSpec = varSpecs[0];
      var varName = varSpec.name;
      var arrayValue: any[] = varSpec.suffices['*'] ? stringValue.split(separator || ",") : [stringValue];
      var hasEquals = (shouldEscape && stringValue.indexOf('=') != -1);	// There's otherwise no way to distinguish between "{value*}" for arrays and objects
      for (var i = 1; i < arrayValue.length; i++) {
        var stringValue = arrayValue[i];
        if (hasEquals && stringValue.indexOf('=') == -1) {
          // Bit of a hack - if we're expecting "=" for key/value pairs, and values can't contain "=", then assume a value has been accidentally split
          arrayValue[i - 1] += (separator || ",") + stringValue;
          arrayValue.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < arrayValue.length; i++) {
        var stringValue = arrayValue[i];
        if (shouldEscape && stringValue.indexOf('=') != -1) {
          hasEquals = true;
        }
        var innerArrayValue = stringValue.split(",");
        for (var j = 0; j < innerArrayValue.length; j++) {
          if (shouldEscape) {
            innerArrayValue[j] = decodeURIComponent(innerArrayValue[j]);
          }
        }
        if (innerArrayValue.length == 1) {
          arrayValue[i] = innerArrayValue[0];
        } else {
          arrayValue[i] = innerArrayValue;
        }
      }

      if (showVariables || hasEquals) {
        var objectValue = resultObj[varName] || {};
        for (var j = 0; j < arrayValue.length; j++) {
          var innerValue = stringValue;
          if (showVariables && !innerValue) {
            // The empty string isn't a valid variable, so if our value is zero-length we have nothing
            continue;
          }
          if (typeof arrayValue[j] == "string") {
            var stringValue = arrayValue[j];
            var innerVarName = stringValue.split("=", 1)[0];
            var stringValue = stringValue.substring(innerVarName.length + 1);
            innerValue = stringValue;
          } else {
            var stringValue = arrayValue[j][0];
            var innerVarName = stringValue.split("=", 1)[0];
            var stringValue = stringValue.substring(innerVarName.length + 1);
            arrayValue[j][0] = stringValue;
            innerValue = arrayValue[j];
          }
          if (objectValue[innerVarName] !== undefined) {
            if (Array.isArray(objectValue[innerVarName])) {
              objectValue[innerVarName].push(innerValue);
            } else {
              objectValue[innerVarName] = [objectValue[innerVarName], innerValue];
            }
          } else {
            objectValue[innerVarName] = innerValue;
          }
        }
        if (Object.keys(objectValue).length == 1 && objectValue[varName] !== undefined) {
          resultObj[varName] = objectValue[varName];
        } else {
          resultObj[varName] = objectValue;
        }
      } else {
        if (resultObj[varName] !== undefined) {
          if (Array.isArray(resultObj[varName])) {
            resultObj[varName] = resultObj[varName].concat(arrayValue);
          } else {
            resultObj[varName] = [resultObj[varName]].concat(arrayValue);
          }
        } else {
          if (arrayValue.length == 1 && !varSpec.suffices['*']) {
            resultObj[varName] = arrayValue[0];
          } else {
            resultObj[varName] = arrayValue;
          }
        }
      }
    } else {
      let arrayValue: any = (varSpecs.length == 1) ? [stringValue] : stringValue.split(separator || ",");
      var specIndexMap: { [key: string]: any } = {};
      for (var i = 0; i < arrayValue.length; i++) {
        // Try from beginning
        var firstStarred = 0;
        for (; firstStarred < varSpecs.length - 1 && firstStarred < i; firstStarred++) {
          if (varSpecs[firstStarred].suffices['*']) {
            break;
          }
        }
        if (firstStarred == i) {
          // The first [i] of them have no "*" suffix
          specIndexMap[i] = i;
          continue;
        } else {
          // Try from the end
          for (var lastStarred = varSpecs.length - 1; lastStarred > 0 && (varSpecs.length - lastStarred) < (arrayValue.length - i); lastStarred--) {
            if (varSpecs[lastStarred].suffices['*']) {
              break;
            }
          }
          if ((varSpecs.length - lastStarred) == (arrayValue.length - i)) {
            // The last [length - i] of them have no "*" suffix
            specIndexMap[i] = lastStarred;
            continue;
          }
        }
        // Just give up and use the first one
        specIndexMap[i] = firstStarred;
      }
      for (var i = 0; i < arrayValue.length; i++) {
        var stringValue = arrayValue[i];
        if (!stringValue && showVariables) {
          // The empty string isn't a valid variable, so if our value is zero-length we have nothing
          continue;
        }
        var innerArrayValue = stringValue.split(",");
        var hasEquals = false;

        if (showVariables) {
          var stringValue = innerArrayValue[0]; // using innerArrayValue
          var varName = stringValue.split("=", 1)[0];
          var stringValue = stringValue.substring(varName.length + 1);
          innerArrayValue[0] = stringValue;
          var varSpec = varSpecMap[varName] || varSpecs[0];
        } else {
          var varSpec = varSpecs[specIndexMap[i]];
          var varName = varSpec.name;
        }

        for (var j = 0; j < innerArrayValue.length; j++) {
          if (shouldEscape) {
            innerArrayValue[j] = decodeURIComponent(innerArrayValue[j]);
          }
        }

        if ((showVariables || varSpec.suffices['*']) && resultObj[varName] !== undefined) {
          if (Array.isArray(resultObj[varName])) {
            resultObj[varName] = resultObj[varName].concat(innerArrayValue);
          } else {
            resultObj[varName] = [resultObj[varName]].concat(innerArrayValue);
          }
        } else {
          if (innerArrayValue.length == 1 && !varSpec.suffices['*']) {
            resultObj[varName] = innerArrayValue[0];
          } else {
            resultObj[varName] = innerArrayValue;
          }
        }
      }
    }
  };
  subFunction.varNames = varNames;

  return {
    prefix: prefix,
    substitution: subFunction,
    unSubstitution: guessFunction
  };
}


/**
 * Uri represents and implements URI Templates as defined by https://tools.ietf.org/html/rfc6570
 */
export class Uri {

  private textParts: string[];
  private varNames: string[];
  private substitutions: any[];

  /**
   * Creates a new instance of Uri.
   *
   * @param raw Template string
   */
  constructor (
    private raw: string
  ) {

    var parts = raw.split("{");
    var textParts = [parts.shift()];
    var prefixes = [];
    var substitutions = [];
    var unSubstitutions = [];
    var varNames: string[] = [];
    while (parts.length > 0) {
      var part = parts.shift();
      var spec = part.split("}")[0];
      var remainder = part.substring(spec.length + 1);
      var funcs = uriTemplateSubstitution(spec);
      substitutions.push(funcs.substitution);
      unSubstitutions.push(funcs.unSubstitution);
      prefixes.push(funcs.prefix);
      textParts.push(remainder);
      varNames = varNames.concat(funcs.substitution.varNames);
    }

    this.substitutions = substitutions;
    this.textParts = textParts;
    this.varNames = varNames;
  }

  /**
   * Creates a new Uri from the template string given in <code>url</code>.
   *
   * @param template URI Template, e.g. 'http://www.example.com/foo{?query,number}'
   * @returns Uri instance
   */
  public static of(template: string): Uri {
    return new Uri(template);
  }

  /**
   * @returns Returns the template string of this Uri.
   */
  public get template(): string {
    return this.raw;
  }

  /**
   * Expands the template of this Uri by substituting variables with values given in <code>vars</code>.
   *
   * @param vars A key/value object containin the variable values
   * @returns An expanded URI string
   */
  public expand(vars: { [key: string]: any}): string {
    let valueFn: (key: string) => string = function (varName) {
      return vars[varName];
    };

    return this.expandBy(valueFn);
  }


  /**
   * Expands the template of this Uri by substituting variables with values provided by <code>valueFn</code>.
   *
   * @param valueFn A callback function that returns variable values
   * @returns An expanded URI string
   */
  public expandBy(valueFn: (key: string) => any): string {

    var result = this.textParts[0];
    for (var i = 0; i < this.substitutions.length; i++) {
      var substitution = this.substitutions[i];
      result += substitution(valueFn);
      result += this.textParts[i + 1];
    }

    return result;
  }

  // TODO ... deprecation?
  public fromUri(uri: string): Uri {
    //this.uritemplate = utpl.utpl(uri);

    return this;
  }

}
