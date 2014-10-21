/*!
Copyright 2014 Adobe Systems Inc.;
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports = function(grunt) {
    
    var copyright = '/*\n' +
                    'Copyright 2014 Adobe Systems Incorporated. Licensed under the Apache 2.0 License.\n' +
                    'http://www.apache.org/licenses/LICENSE-2.0.html\n' +
                    '*/\n\n';


    var IIFEopen = '(function() {\n"use strict";\n\n';
    var IIFEclose = '\n})();';
    
    var project = {
        files: ['src/metrics.js', 'src/layout.js', 'src/main.js']
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        header: copyright+IIFEopen,
        footer: IIFEclose,

        concat: {
            options: {
                stripBanners: 'true',
                banner: '<%= header %>',
                footer: '<%= footer %>'
            },
            dist: {
                src: project.files,
                dest: '<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                preserveComments: 'false',
                banner: '<%= copyright %>'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: '<%= pkg.name %>.min.js'
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
}