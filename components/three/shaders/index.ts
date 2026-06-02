export const waveformVertexShader = `
uniform float uTime;
uniform float uAmplitude;
uniform vec2 uMouse;

void main() {
  vec3 pos = position;
  float wave = sin(pos.x * 3.0 + uTime) * uAmplitude
             + sin(pos.x * 7.0 + uTime * 1.5) * uAmplitude * 0.5;
  pos.y += wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const waveformFragmentShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 green = vec3(0.102, 1.0, 0.42);
  float alpha = 0.6 + sin(uTime * 2.0 + vUv.x * 10.0) * 0.2;
  gl_FragColor = vec4(green, alpha);
}
`;

export const sphereVertexShader = `
uniform float uTime;
uniform float uAmplitude;

void main() {
  vec3 pos = position;
  float wave = sin(pos.x * 4.0 + uTime) * uAmplitude
             + sin(pos.y * 3.0 + uTime * 0.8) * uAmplitude * 0.6
             + sin(pos.z * 5.0 + uTime * 1.2) * uAmplitude * 0.4;
  pos += normal * wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const sphereFragmentShader = `
varying vec3 vNormal;

void main() {
  vec3 green = vec3(0.102, 1.0, 0.42);
  float intensity = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
  gl_FragColor = vec4(green * intensity, 0.8);
}
`;
