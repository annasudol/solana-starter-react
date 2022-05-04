const anchor = require("@project-serum/anchor");
const assert = require("assert");
const { createBlog } = require("./functions/createBlog");
const { createUser } = require("./functions/createUser");
const { createPost } = require("./functions/createPost");

describe("blog-sol", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.BlogSol;

  it("initialize blog account", async () => {
    const { blog, genesisPostAccount } = await createBlog(
      program,
      provider
    );

    // console.log("Blog account key: ", blogAccount.publicKey.toString());
    assert.equal(
      blog.currentPostKey.toString(),
      genesisPostAccount.publicKey.toString()
    );

    assert.equal(
      blog.authority.toString(),
      provider.wallet.publicKey.toString()
    );
  });

  // return;

  it("signup a new user", async () => {
    const { user, name } = await createUser(program, provider);

    assert.equal(user.name, name);

    assert.equal(
      user.authority.toString(),
      provider.wallet.publicKey.toString()
    );
  });

  it("creates a new post", async () => {
    const { blog, blogAccount } = await createBlog(program, provider);
    const { userAccount } = await createUser(program, provider);

    const { title, post } = await createPost(
      program,
      provider,
      blogAccount,
      userAccount
    );

    assert.equal(post.title, title);
    assert.equal(post.user.toString(), userAccount.publicKey.toString());
    assert.equal(post.prePostKey.toString(), blog.currentPostKey.toString());
    assert.equal(
      post.authority.toString(),
      provider.wallet.publicKey.toString()
    );
  });
});