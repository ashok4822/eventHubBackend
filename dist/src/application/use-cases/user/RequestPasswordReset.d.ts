import { IUserRepository } from '../../ports/IUserRepository';
import { IEmailService } from '../../ports/IEmailService';
import { IRequestPasswordReset } from '../../ports/IUseCases';
/**
 * Use case for requesting a password reset.
 */
export declare class RequestPasswordReset implements IRequestPasswordReset {
    private _userRepository;
    private _emailService;
    constructor(_userRepository: IUserRepository, _emailService: IEmailService);
    execute(email: string): Promise<void>;
}
//# sourceMappingURL=RequestPasswordReset.d.ts.map