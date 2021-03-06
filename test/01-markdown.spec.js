'use strict';
var chai = require( 'chai' );
var should = chai.should();
var hybrid = require( './../lib/index' );
var Handlebars = require( 'handlebars' );

describe( 'Markdown', function () {

	before( function ( done ) {
		hybrid( 'markdown' ).register( Handlebars, {} );
		done();
	} );

	it( 'hint: should have a hint helper', function ( done ) {
		var source = '{{#hint "Hint"}}\nSome text within the hint{{/hint}}';
		var template = Handlebars.compile( source );
		var content = template();
		content.should.be.eql( '>**Hint**\n> Some text within the hint\n  ' );
		done();
	} );

	it( 'hint: {{#hint}} ... multiple lines{{/hint}}', function ( done ) {
		var source = '{{#hint}}\nFirst line\nSecond line\n{{/hint}}';
		var template = Handlebars.compile( source );
		var content = template();
		content.should.be.eql( '>**Hint:**\n> First line\n> Second line\n  ' );
		done();
	} );

	it( 'comment: should have a comment helper', function ( done ) {
		var source = '{{#comment}}\nThis is comment{{/comment}}';
		var template = Handlebars.compile( source );
		var content = template();
		content.should.be.empty;
		done();
	} );

	it( 'hidden: should have a hidden helper', function ( done ) {
		var source = '{{#hidden}}\nThis is comment{{/hidden}}';
		var template = Handlebars.compile( source );
		var content = template();
		content.should.be.empty;
		done();
	} );

	it( 'image: should have an image helper', function ( done ) {
		var source = '{{image "images/image1.png"}}';
		var template = Handlebars.compile( source );
		var content = template();
		content.should.eql( '![](images/image1.png)  ' );
		done();
	} );

} );
