use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;


declare_id!("nsdJrLLi445r4tURcinwgtCpReFUz9LmkQmSGK3e445nsdJrLLi445r4tURcinwgtCpReFUz9LmkQmSGK3e445");

#[program]
pub mod blog {

    use super::*;

    pub fn init_blog(ctx: Context<InitBlog>) -> ProgramResult {
        let blog_account = &mut ctx.accounts.blog_account;
        let genesis_post_account = &mut ctx.accounts.genesis_post_account;
        let authority = &mut ctx.accounts.authority;

        blog_account.authority = authority.key();
        blog_account.current_post_id = genesis_post_account.key();

        Ok(())
    }

    pub fn signup_user(ctx: Context<SignupUser>, name: String) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        user_account.name = name;
        user_account.authority = authority.key();

        Ok(())
    }


    pub fn create_post(ctx: Context<CreatePost>, title: String) -> ProgramResult {
        let blog_account = &mut ctx.accounts.blog_account;
        let post_account = &mut ctx.accounts.post_account;
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        post_account.title = title;
        post_account.user = user_account.key();
        post_account.authority = authority.key();
        post_account.pre_post_id = blog_account.current_post_id;

        blog_account.current_post_id = post_account.key();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitBlog<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 32)]
    pub blog_account: Account<'info, BlogState>,
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 32 + 8)]
    pub genesis_post_account: Account<'info, PostState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init, payer = authority, space = 8 + 50 + 500 + 32 + 32 + 32 + 32 + 32 + 32)]
    pub post_account: Account<'info, PostState>,
    #[account(mut, has_one = authority)]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub blog_account: Account<'info, BlogState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct SignupUser<'info> {
    #[account(init, payer = authority, space = 8 + 40 + 120  + 32)]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
pub struct BlogState {
    pub current_post_id: Pubkey,
    pub authority: Pubkey,
}

#[account]
pub struct UserState {
    pub name: String,
    pub authority: Pubkey,
}

#[account]
pub struct PostState {
    title: String,
    user: Pubkey,
    pub pre_post_id: Pubkey,
    pub authority: Pubkey,
}