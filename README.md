# Access Grantor

[![Build Status](https://travis-ci.com/TriNimbus/access-grantor.svg?token=qUgWaG44GiU7kPHZFG3v&branch=master)](https://travis-ci.com/TriNimbus/access-grantor)

This repo contains a static generator for a [CloudFormation][cf] template using [`grunt`][grunt], [`assemble`][ass], and [`handlebars`][hb]. It is based on [this approach][post]. The resulting template can be run in customer accounts to delegate access to TriNimbus staff. The template is synced to a public-read bucket [`s3://trust.trinimbus.com`][template] and customers can create the stack directly from this template in our S3.

Public-facing instructions for this process are in the same S3 bucket website, [http://trust.trinimbus.com](http://trust.trinimbus.com).

## Stack Creation
Customers can directly create this stack from our template: https://s3-us-west-2.amazonaws.com/trust.trinimbus.com/stack.template

### Parameters
1. `TrustedAwsAccountId`: Our main AWS account. Prepopulated as a parameter.
2. `TrustedIamEntity`: who to trust. `root` for everyone at TriNimbus or be more specific: `user/kima`, etc (unfortunately groups aren't a valid Principal for this purpose).
3. `TrustedIamUser{1-10}`: Up to ten other trusted IAM users in the trusted account: `user/joe`, `user/mary`, etc.

# Deploying Changes with Travis (recommended)

1. Make a new branch
  * `git checkout -b new-branch` 
2. Edit the template `*.hbs` files and/or the web `instructions/*.md` files 
3. Render the CloudFormation
  * `grunt render`
4. Render the web content
  * `grunt prepare_site`
5. Inspect the generated output in `_output`.
6. Push changes to GitHub
  * `git push -u origin new-branch`
7. Merge changes to `master` _(this updates the repo, but won't deploy the changes to the bucket yet)_
  * Open pull request
  * Wait for Travis to report that the branch is ready for merge 
  * Conduct review cycle with peer if necessary
  * Merge pull request
8. Deploying changes to CloudFormation and/or web _(this will actually write the rendered changes to the bucket)_
  * Open a pull request with a **base** of `release` and a **compare** to `master` (**it's crucial to get the order right!**)
  * Wait for Travis to report that the branch is ready for merge
  * Merge the pull request
  * Visit https://travis-ci.com/TriNimbus/access-grantor to see the deployment process
9. All going well, the CloudFormation and/or web instructions will be re-deployed into the `s3://trust.trinimbus.com` bucket
10. Visit http://trust.trinimbus.com; the `index` document and the `stack.template` file should contain metadata with the latest commit hash from the `release` branch

# Deploying Locally

## Initial Setup
In order to generate the CloudFormation, or static site, perform the following initial setup on your environment:

1. Install packages from `package.json` (requires `npm` to be installed globally)
  * `npm install`
2. Install front-end assets from `bower.json` (requires `bower` to be installed globally)
  * `bower install`
3. Run tasks with `grunt` as shown below (requires `grunt-cli` to be installed globally)

## Editing CloudFormation
To make edits, do the following:

1. Generate CloudFormation
  * `grunt render`
2. The results will appear in `_output`; e.g. `_output/stack.template`.
3. Sync to the public bucket
  * `aws s3 sync _output/ s3://trust.trinimbus.com --delete`
4. Provide the customer with the URL:
  * e.g. https://s3-us-west-2.amazonaws.com/trust.trinimbus.com/stack.template

## Editing the Instructions
1. Make changes to `instructions/index.md`
2. Re-render the web assets
  * `grunt prepare_site`
3. Sync to the bucket, as above

[post]: https://github.com/dliggat/cloudformable
[hb]: http://handlebarsjs.com/
[grunt]: http://gruntjs.com/
[ass]: http://assemble.io/
[cf]: https://aws.amazon.com/cloudformation
[template]: https://s3-us-west-2.amazonaws.com/trust.trinimbus.com/stack.template
